
# Idyll 

Idyll is a food blogging platform where anyone can share or view their food recipes/ideas. It's built with an easy and intuitive UI and a Notion-like rich text editor so that users can spend more time on perfecting their recipes, not struggling with navigating a confusing website.

Home page:
![HomePage](/images/idyll_home.png)

Post:
![PostPage](/images/idyll_post.png)

## Technologies
- **Next.js/React and Tailwind** for the front-end framework and server-side components
- **NextAuth w/ Google OAuth & JWTs** for easy yet robust and secure authentication
- **PostgreSQL w/ Prisma ORM** for database and database management
- **AWS Technologies:**
    - **EC2** for server hosting and deployment 
    - **RDS** for Postgres in the cloud 
    - **S3** for hosting static files such as user-uploaded images, and **CloudFront** for global CDN
    - **Route53** for DNS management
- **Docker** for containerization and easy deployments on any platform
- **Nginx** as a proxy for HTTP/HTTPS requests, and SSL certification


## Features
- Notion-like rich text editor that follows the What You See Is What You Get (WYSIWYG) principle, for seamless and easy text editing on the user's end
    - Supports images directly in the editor, with images automatically uploaded to S3 bucket
- Easy authentication through Google OAuth
- Users can **C**reate, **R**ead, **U**pdate, and **D**elete (CRUD) their own posts, as well as draft but not post content
- Dashboard page for existing users to manage previous posts and drafts

## Local Development

Before you begin, ensure you have met the following requirements:

- Docker and Docker Compose installed on your machine.
- Node.js (if you plan to run the application outside Docker).
- An AWS EC2 instance (optional, for deployment)

To set up the Idyll application for local development:

1. **Clone the Repository**

    ```sh
    git clone https://github.com/jensenzhng/idyll-next.git
    cd idyll-next
    ```

2. **Build and Run with Docker Compose**

    ```sh
    docker-compose up --build
    ```

This command builds the application and starts the services defined in `docker-compose.yml`. Note that you need two files in your root directory: `.env` and `.npmrc`.

## Configuration

Your `.env` file should look something like this:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=

AWS_DATABASE_URL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_CDN_DOMAIN=
AWS_BUCKET_NAME=
```
The ,npmrc is used because a dependency, `@tiptap-pro/extension-file-handler`, requires access to Tiptap's private registry. Make sure to insert your auth token into the `.npmrc` file to make sure all dependencies are installed properly.

## Deployment

To deploy the Idyll Next.js application on an AWS EC2 instance:

1. **Transfer Project to EC2 Instance**

    Use SCP or your preferred method to transfer the project files to your EC2 instance.

    ```sh
    scp -i /path/to/your-key.pem -r /local/path/to/idyll-next ec2-user@your-instance-public-ip:/remote/path
    ```

2. **Run the Application on EC2**

    SSH into your EC2 instance, clone and navigate to the project directory, and start the application with Docker Compose:

    ```sh
    cd /remote/path/idyll-next
    docker-compose up --build -d
    ```

Note that for this to run on EC2, you must have generated a SSL certificate on your EC2 machine. I used Let's Encrypt for this.


## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.


## Contact

For questions or comments, please contact me @ jzhang3318@gatech.edu. Thank you!
