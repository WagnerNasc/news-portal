import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ICreatePost } from "../../interfaces/create-post.interface";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { PrismaService } from "~/infra/database/prisma.service";
import { Post } from "@prisma/client";
import { WherePost } from "../../dtos";

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

  async updateImageById(id: string, image: string): Promise<void> {
    try {
      await this.prisma.post.update({
        where: {
          id,
        },
        data: {
          image,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<Post | null> {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!post) {
        return null;
      }

      return post;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async findMany(filter: WherePost): Promise<Post[] | null> {
    try {
      const { skip, take, ...where } = filter;
      const posts = await this.prisma.post.findMany({
        where,
        skip,
        take,
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

  async countManyPosts(filter: WherePost): Promise<number | null> {
    try {
      const { skip, take, ...where } = filter;
      const count = await this.prisma.post.count({
        where,
        skip,
        take,
      });

      return count;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }
}
