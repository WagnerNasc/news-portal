import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaUserRepository } from "~/application/users/repositories/prisma/prisma-user.repository";
import { UserRepository } from "~/application/users/repositories/user.repository";
import { PrismaCategoryRepository } from "~/application/categories/repositories/prisma/prisma-category.repository";
import { PrismaPostRepository } from "~/application/posts/repositories/prisma/prisma-post.repository";

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaCategoryRepository,
    PrismaPostRepository
  ],
  exports: [
    PrismaUserRepository,
    PrismaCategoryRepository,
    PrismaPostRepository
  ],
})
export class DatabaseModule {}