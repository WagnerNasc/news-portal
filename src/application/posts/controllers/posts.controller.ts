import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { ApiConsumes, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePostDto, GetPostDto } from "../dtos";
import { ApiDefaultResponse } from "~/commons/decorators/api-response";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { ApiErrorResponse } from "~/commons/decorators/api-error-response";
import { PaginatedResultsDto } from "~/commons/dtos/paginated-results.dto";
import { FilterPostDto } from "../dtos/filter-post.dto";

import { CreatePost } from "../use-cases/create-post";
import { GetAllPosts } from "../use-cases/get-all-posts";
import { FastifyRequest } from "fastify";
import { UploadImagePost } from "../use-cases/upload-image-post";
import { ApiUploadFile } from "~/commons/decorators/api-upload-file";

@ApiTags("Posts")
@ApiExtraModels(GetPostDto)
@Controller("posts")
export class PostsController {
  constructor(
    private readonly createPost: CreatePost,
    private readonly getAllPosts: GetAllPosts,
    private readonly uploadImagePost: UploadImagePost,
  ) {}

  @ApiOperation({ description: "Method to create a post" })
  @ApiDefaultResponse({
    model: GetPostDto,
    status: HttpStatus.CREATED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.FORBIDDEN_RESOURCE,
    status: HttpStatus.FORBIDDEN,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    const post = await this.createPost.execute({
      ...createPostDto,
    });

    return GetPostDto.factory(GetPostDto, post);
  }

  @ApiOperation({
    description: "Method to list all posts paginated by author id an category id",
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.FORBIDDEN_RESOURCE,
    status: HttpStatus.FORBIDDEN,
  })
  @Get()
  async findManyPosts(@Query(ValidationPipe) filter: FilterPostDto) {
    const { page, pageSize } = filter;

    console.log({ filter });
    const pageNumber = page ?? 0;

    const { posts, count } = await this.getAllPosts.execute(filter);

    return new PaginatedResultsDto(
      GetPostDto.factory(GetPostDto, posts),
      count,
      pageNumber,
      pageSize,
    );
  }

  @ApiOperation({
    description: "Method to upload image",
  })
  @ApiUploadFile()
  @ApiConsumes("multipart/form-data")
  @ApiDefaultResponse({ status: HttpStatus.ACCEPTED })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiErrorResponse({
    message: ExceptionsConstants.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.FORBIDDEN_RESOURCE,
    status: HttpStatus.FORBIDDEN,
  })
  @Post(":id/upload")
  async uploadFile(@Req() req: FastifyRequest, @Param("id") id: string) {
    console.log(req.file);
    await this.uploadImagePost.execute({
      req,
      id,
    });
  }
}
