import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
  const posts = [
    {
      id: "f9ea82e4-3297-47a3-9465-69c4d1830888",
      title: "Low Carb",
      content: "Low carb is new diet",
      image: "./upload-post-image/diet.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "bfa000b4-ee53-45b7-b41b-6c1c9e0ca4fe",
      title: "Dolar",
      content: "Dollar falling",
      image: "./upload-post-image/dollar.jpg",
      authorId: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      categoryId: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
    },
    {
      id: "4d7e4d23-8a27-4b20-841f-983b1e2b7a92",
      title: "Fictional Title 1",
      content: "Fictional Content 1",
      image: "./upload-post-image/fictional1.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "8f1e6a65-bd84-4a95-9a1e-2c05cf6206d7",
      title: "Fictional Title 2",
      content: "Fictional Content 2",
      image: "./upload-post-image/fictional2.jpg",
      authorId: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      categoryId: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
    },
    {
      id: "b06c3a9d-7442-46fc-a920-5e2cbab0bb44",
      title: "Fictional Title 3",
      content: "Fictional Content 3",
      image: "./upload-post-image/fictional3.jpg",
      authorId: "97f656f1-4f5c-446a-a74c-9022d157f133",
      categoryId: "85ac441c-a3ca-4f7d-a5e0-ad296e18a2b3",
    },
    // Mais 14 posts fictícios
    {
      id: "09fb87b9-55af-4a37-82cf-5876c7b10542",
      title: "Fictional Title 4",
      content: "Fictional Content 4",
      image: "./upload-post-image/fictional4.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "eb5d9c65-8b07-42b2-bc60-39ec1f963671",
      title: "Fictional Title 5",
      content: "Fictional Content 5",
      image: "./upload-post-image/fictional5.jpg",
      authorId: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      categoryId: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
    },
    {
      id: "ec20c11b-65a1-4f76-9c45-39c0a125aa26",
      title: "Fictional Title 6",
      content: "Fictional Content 6",
      image: "./upload-post-image/fictional6.jpg",
      authorId: "97f656f1-4f5c-446a-a74c-9022d157f133",
      categoryId: "85ac441c-a3ca-4f7d-a5e0-ad296e18a2b3",
    },
    {
      id: "01af6e12-1558-4c72-b2cc-6f45e7fc845c",
      title: "Fictional Title 7",
      content: "Fictional Content 7",
      image: "./upload-post-image/fictional7.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "983ef4b1-6ec5-4c1e-87c7-42a2722e192b",
      title: "Fictional Title 8",
      content: "Fictional Content 8",
      image: "./upload-post-image/fictional8.jpg",
      authorId: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      categoryId: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
    },
    {
      id: "be3082f1-e349-48fb-b3a5-4a2e43c40f0f",
      title: "Fictional Title 9",
      content: "Fictional Content 9",
      image: "./upload-post-image/fictional9.jpg",
      authorId: "97f656f1-4f5c-446a-a74c-9022d157f133",
      categoryId: "85ac441c-a3ca-4f7d-a5e0-ad296e18a2b3",
    },
    {
      id: "6c1e387e-96bb-46c9-b9d5-05fb548e0e09",
      title: "Fictional Title 10",
      content: "Fictional Content 10",
      image: "./upload-post-image/fictional10.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "5211b654-e5eb-4dd4-8f14-0fb3970574ab",
      title: "Fictional Title 11",
      content: "Fictional Content 11",
      image: "./upload-post-image/fictional11.jpg",
      authorId: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      categoryId: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
    },
    {
      id: "73ed507d-21f4-43a9-a5c1-7a191e0bfa27",
      title: "Fictional Title 12",
      content: "Fictional Content 12",
      image: "./upload-post-image/fictional12.jpg",
      authorId: "97f656f1-4f5c-446a-a74c-9022d157f133",
      categoryId: "85ac441c-a3ca-4f7d-a5e0-ad296e18a2b3",
    },
    {
      id: "b983cb09-63cc-4cd5-b7de-9008a9d3c0b2",
      title: "Fictional Title 13",
      content: "Fictional Content 13",
      image: "./upload-post-image/fictional13.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "a2c0b23a-df4d-4ef3-bd8a-95a4c8db6f5c",
      title: "Fictional Title 14",
      content: "Fictional Content 14",
      image: "./upload-post-image/fictional14.jpg",
      authorId: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      categoryId: "a305b849-2af4-44f9-a7c4-905bebb1e9f2",
    },
    {
      id: "b85d3f2f-e053-4b9c-b02d-87ad86901e14",
      title: "Fictional Title 15",
      content: "Fictional Content 15",
      image: "./upload-post-image/fictional15.jpg",
      authorId: "97f656f1-4f5c-446a-a74c-9022d157f133",
      categoryId: "85ac441c-a3ca-4f7d-a5e0-ad296e18a2b3",
    },
    {
      id: "75e0ce82-1cd3-4ae7-a877-17742957c987",
      title: "Fictional Title 16",
      content: "Fictional Content 16",
      image: "./upload-post-image/fictional16.jpg",
      authorId: "581a1686-23a4-496d-868f-477ecac9540d",
      categoryId: "e7b456f6-3051-49bd-9e01-f442bd1473b4",
    },
    {
      id: "6c99d4c8-18c4-4d5d-933f-14c1b6e53461",
      title: "Fictional Title 17",
      content: "Fictional Content 17",
      image: "./upload-post-image/fictional17.jpg",
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
