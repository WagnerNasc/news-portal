import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";
import { Inject, Injectable } from "@nestjs/common";
import { FilterPostDto } from "../dtos";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";

@Injectable()
export class GetAllPosts {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private postRepository: PrismaPostRepository,
  ) {}

  async execute(filter: FilterPostDto) {
    const { page, pageSize, authorId, categoryId } = filter;

    const where = {
      authorId: authorId || undefined,
      categoryId: categoryId || undefined,
      skip: page * pageSize,
      take: pageSize,
    };

    const value: string = await this.cacheManager.get(
      `posts:${page}:${pageSize}` + authorId
        ? `:${authorId}`
        : null + categoryId
          ? `${categoryId}`
          : null,
    );

    if (value) {
      return JSON.parse(value);
    }

    const [posts, count] = await Promise.all([
      await this.postRepository.findMany(where),
      await this.postRepository.countManyPosts(where),
    ]);

    await this.cacheManager.set(
      `posts:${page}:${pageSize}` + authorId
        ? `:${authorId}`
        : null + categoryId
          ? `${categoryId}`
          : null,
      JSON.stringify({ posts, count }),
    );

    return {
      posts,
      count,
    };
  }
}
