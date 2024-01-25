import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
  const posts = [
    {
      id: "f9ea82e4-3297-47a3-9465-69c4d1830888",
      title: "Low Carb",
      content: "Low carb is new diet",
      image: "photos/diet.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "bfa000b4-ee53-45b7-b41b-6c1c9e0ca4fe",
      title: "Dolar",
      content: "Dollar falling",
      image: "photos/dollar.jpg",
      authorId: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      categoryId: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
    },
  ];

  for await (const post of posts) {
    await prisma.post.upsert({
      where: {
        id: post.id,
      },
      update: post,
      create: post,
    });
  }
}
