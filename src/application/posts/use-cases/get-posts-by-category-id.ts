import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ExceptionsConstants } from "commons/consts/exceptions";
import { FilterPostDto } from "../dtos/filter-post.dto";
import { PrismaUserRepository } from "~/application/users/repositories/prisma/prisma-user.repository";

interface GetPostsByCategoryIdRequest {
  categoryId: string;
  filter: FilterPostDto
}


@Injectable()
export class GetPostsByCategoryId {
  constructor(
    private postRepository: PrismaPostRepository,
    private userRepository: PrismaUserRepository,
  ) {}

  async execute({categoryId, filter}: GetPostsByCategoryIdRequest) {
    const { page, pageSize } = filter;

    const categoryFound = await this.userRepository.findById(categoryId);

    if (!categoryFound) {
      throw new BadRequestException(ExceptionsConstants.USER_NOT_FOUND)
    }

    const pageNumber = Number(page ?? 0);
    const where = {
      categoryId,
      skip: Number(pageNumber * pageSize),
      take: Number(pageSize || 10)
    };

    const [ posts, count ] = await Promise.all([
      await this.postRepository.findManyByCategoryId(where),
      await this.postRepository.countPostsByCategoryId(where)
    ])
   

    return {
      posts,
      count
    }
  }
}
