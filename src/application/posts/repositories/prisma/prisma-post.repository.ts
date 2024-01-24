import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ICreatePost } from "../../interfaces/create-post.interface";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { PrismaService } from "~/infra/database/prisma.service";
import { Post } from "@prisma/client";
import { WherePostByAuthorId, WherePostByCategoryId } from "../../dtos";

@Injectable()
export class PrismaPostRepository {
  private readonly logger = new Logger(PrismaPostRepository.name);

  constructor(private prisma: PrismaService) {}

  async create(post: ICreatePost): Promise<Post> {
    try {
      return this.prisma.post.create({
        data: post,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async findManyByAuthorId(
    params: WherePostByAuthorId,
  ): Promise<Post[] | null> {
    try {
      const { authorId } = params;
      const posts = await this.prisma.post.findMany({
        where: {
          authorId
        },
      });

      if (!posts) {
        return null;
      }

      return posts;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async countPostsByAuthorId(params: WherePostByAuthorId): Promise<number | null> {
    try {
      const { authorId } = params;
      const where = {
        authorId
      };

      const count = await this.prisma.post.count({
        where,
      });

      return count;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async findManyByCategoryId(
    params: WherePostByCategoryId,
  ): Promise<Post[] | null> {
    try {
      const { categoryId } = params;
      const posts = await this.prisma.post.findMany({
        where: {
          categoryId
        },
      });

      if (!posts) {
        return null;
      }

      return posts;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async countPostsByCategoryId(params: WherePostByCategoryId): Promise<number | null> {
    try {
      const { categoryId } = params;
      const where = {
        categoryId
      };

      const count = await this.prisma.post.count({
        where,
      });

      return count;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async findMany(): Promise<Post[] | null> {
    try {
      const posts = await this.prisma.post.findMany();

      if (!posts) {
        return null;
      }

      return posts;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async countManyPosts(): Promise<number | null> {
    try {
      const count = await this.prisma.post.count();

      return count;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }
}
