import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const PostCard = ({ author, authorImage, title, description, postId }) => {
    const router = useRouter();

    return (
        <div onClick={() => {   
            router.push(`/post/${postId}`)
        }} className="post-card mb-8 border-l-4 pl-4 max-w-[30rem] md:max-w-[40rem] border-green-600 w-full cursor-pointer">
            <span className="flex flex-row justify-between">
                <div>
                    <h2 className="font-bold text-2xl md:text-3xl text-[#1F1F1F] mb-1">
                        {title}
                    </h2>
                    <p className="text-base text-gray-600 mb-2">
                        {description}
                    </p>
                    <span className="flex items-center space-x-2 my-0">
                        <Image
                            src={authorImage}
                            alt="Author Image"
                            className="rounded-full"
                            width={25}
                            height={25}
                        />
                        <span className="text-base text-[#1F1F1F]">
                            By {author}
                        </span>
                    </span>
                </div>
                <span className="flex items-center" href={`/post/${postId}`}>
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                </span>
            </span>
        </div>
    );
};

export default PostCard;
