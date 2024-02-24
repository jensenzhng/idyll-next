const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Seed Users

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });



    // model User {
    //     id            String       @default(cuid()) @id
    //     name          String
    //     email         String   @unique
    //     createdAt     DateTime  @default(now()) @map(name: "created_at")
    //     updatedAt     DateTime  @updatedAt @map(name: "updated_at")
    //     posts         Post[]
    //     @@map(name: "users")
    //   }
      
      
    //   model Post {
    //     id        String     @default(cuid()) @id
    //     title     String
    //     content   String?
    //     published Boolean @default(false)
    //     author    User?   @relation(fields: [authorId], references: [id])
    //     authorId  String?
    //   }