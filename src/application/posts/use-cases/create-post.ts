import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ExceptionsConstants } from "commons/consts/exceptions";
import { ICreatePost } from "../interfaces/create-post.interface";
import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";

@Injectable()
export class CreatePost {
  constructor(
    private postRepository: PrismaPostRepository,
  ) {}

  async execute(params: ICreatePost) {
    return this.postRepository.create(params);
  }
}
