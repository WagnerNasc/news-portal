import { Injectable, NotFoundException } from "@nestjs/common";
import { ICreatePost } from "../interfaces/create-post.interface";
import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";
import { PrismaUserRepository } from "~/application/users/repositories/prisma/prisma-user.repository";
import { PrismaCategoryRepository } from "~/application/categories/repositories/prisma/prisma-category.repository";
import { ExceptionsConstants } from "~/commons/consts/exceptions";

@Injectable()
export class CreatePost {
  constructor(
    private postRepository: PrismaPostRepository,
    private userRepository: PrismaUserRepository,
    private categoryRepository: PrismaCategoryRepository,
  ) {}

  async execute(params: ICreatePost) {
    const { authorId, categoryId } = params;

    const [author, category] = await Promise.all([
      this.userRepository.findById(authorId),
      this.categoryRepository.findById(categoryId),
    ]);

    if (!author) {
      throw new NotFoundException(ExceptionsConstants.USER_NOT_FOUND);
    }

    if (!category) {
      throw new NotFoundException(ExceptionsConstants.CATEGORY_NOT_FOUND);
    }

    return this.postRepository.create(params);
  }
}
