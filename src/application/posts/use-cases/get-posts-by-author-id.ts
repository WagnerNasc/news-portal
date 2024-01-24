import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ExceptionsConstants } from "commons/consts/exceptions";
import { FilterPostDto } from "../dtos";
import { PrismaUserRepository } from "~/application/users/repositories/prisma/prisma-user.repository";

interface GetPostsByAuthorIdRequest {
  authorId: string;
  filter: FilterPostDto
}

@Injectable()
export class GetPostsByAuthorId {
  constructor(
    private postRepository: PrismaPostRepository,
    private userRepository: PrismaUserRepository,
  ) {}

  async execute({authorId, filter}: GetPostsByAuthorIdRequest) {
    const { page, pageSize } = filter;

    const userFound = await this.userRepository.findById(authorId);

    if (!userFound) {
      throw new BadRequestException(ExceptionsConstants.USER_NOT_FOUND)
    }

    const pageNumber = Number(page ?? 0);
    const where = {
      authorId,
      skip: Number(pageNumber * pageSize),
      take: Number(pageSize || 10)
    };

    const [ posts, count ] = await Promise.all([
      await this.postRepository.findManyByAuthorId(where),
      await this.postRepository.countPostsByAuthorId(where)
    ])
   

    return {
      posts,
      count
    }
  }
}
