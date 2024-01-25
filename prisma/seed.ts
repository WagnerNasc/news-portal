import { PrismaClient } from "@prisma/client";
import users from "./seeds/users.seed";
import categories from "./seeds/categories.seed";
import posts from "./seeds/posts.seed";

const prisma = new PrismaClient();

async function main() {
  await users();
  await categories();
  await posts();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
