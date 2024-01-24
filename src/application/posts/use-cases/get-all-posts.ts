import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { FilterPostDto } from "../dtos";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

@Injectable()
export class GetAllPosts {
  constructor(
    private postRepository: PrismaPostRepository,
  ) {}

  async execute(filter: FilterPostDto) {
    const { page, pageSize } = filter;

    const pageNumber = Number(page ?? 0);
    const where = {
      skip: Number(pageNumber * pageSize),
      take: Number(pageSize || 10)
    };

    const [ posts, count ] = await Promise.all([
      await this.postRepository.findMany(),
      await this.postRepository.countManyPosts()
    ])
   

    return {
      posts,
      count
    }
  }
}
