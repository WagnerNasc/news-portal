import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
  const categories = [
    {
      id: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
      name: "diet",
    },
    {
      id: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
      name: "economy",
    },
  ];

  for await (const category of categories) {
    await prisma.category.upsert({
      where: {
        id: category.id,
      },
      update: category,
      create: category,
    });
  }
}
