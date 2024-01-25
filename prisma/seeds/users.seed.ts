import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
  const users = [
    {
      id: "581a1686-23a4-496d-868f-477ecac9540d",
      name: "user 01",
      email: "user01@user.com.br",
    },
    {
      id: "5a9b7d25-41ae-4b29-9f7b-f5068070751d",
      name: "user 02",
      email: "user02@user.com.br",
    },
  ];

  for await (const user of users) {
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: user,
      create: user,
    });
  }
}
