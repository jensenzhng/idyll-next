import s3 from "@/lib/aws-config";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { createRouter } from "next-connect";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

export const config = {
    api: {
        bodyParser: false, // Disabling body parsing, multer will handle multipart/form-data
    },
};

const apiRoute = createRouter({
    // Handle any other HTTP method
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

const uploadMiddleware = upload.single("image");

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    try {
        // Upload file to S3
        console.log(req.file);
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded." });

        const key = `uploads/${uuidv4()}_${file.originalname}.${file.mimetype.split("/")[1]}`;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.upload(params).promise();

        // Return S3 file URL
        const fileUrl = `https://${process.env.AWS_CDN_DOMAIN}/${key}`;
        res.status(200).json({ url: fileUrl });
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        res.status(500).json({ error: "Failed to upload file to S3" });
    }
});

export default apiRoute.handler();
