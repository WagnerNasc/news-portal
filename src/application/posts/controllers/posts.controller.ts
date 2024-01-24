import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePostDto, GetPostDto } from "../dtos";
import { ApiDefaultResponse } from "~/commons/decorators/api-response";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { ApiErrorResponse } from "~/commons/decorators/api-error-response";
import { PaginatedResultsDto } from "~/commons/dtos/paginated-results.dto";
import { FilterPostDto } from "../dtos/filter-post.dto";

import { GetPostsByAuthorId } from "../use-cases/get-posts-by-author-id";
import { GetPostsByCategoryId } from "../use-cases/get-posts-by-category-id";
import { CreatePost } from "../use-cases/create-post";
import { GetAllPosts } from "../use-cases/get-all-posts";


@ApiExtraModels(GetPostDto)
@Controller("posts")
export class PostsController {
  constructor(
    private readonly createPost: CreatePost,
    private readonly getAllPosts: GetAllPosts,
    private readonly getPostsByAuthorId: GetPostsByAuthorId,
    private readonly getPostsByCategoryId: GetPostsByCategoryId,
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
  @ApiTags("Post")
  @Post("/author/:authorId/category/:categoryId")
  async create(
    @Param("authorId") authorId: string,
    @Param("categoryId") categoryId: string,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ) {
    const post = await this.createPost.execute({
      authorId,
      categoryId,
      ...createPostDto,
    });

    return GetPostDto.factory(GetPostDto, post);
  }

  @ApiOperation({
    description: "Method to list all posts",
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
  async findManyPosts(
    @Query(ValidationPipe) filter: FilterPostDto,
  ) {
    const { page, pageSize } = filter;
    const pageNumber = Number(page ?? 0);
  
    const { posts, count } = await this.getAllPosts.execute(
      filter,
    );
  
    return new PaginatedResultsDto(
      GetPostDto.factory(GetPostDto, posts),
      count,
      pageNumber,
      pageSize,
    );
  }

  @ApiOperation({
    description: "Method to list post by author id",
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.FORBIDDEN_RESOURCE,
    status: HttpStatus.FORBIDDEN,
  })
  @Get("/author/:authorId")
  async findManyByAuthorId(
    @Query(ValidationPipe) filter: FilterPostDto,
    @Param("authorId") authorId: string,
  ) {
    const { page, pageSize } = filter;
    const pageNumber = Number(page ?? 0);

    const { posts, count } = await this.getPostsByAuthorId.execute({
      authorId,
      filter,
    });

    return new PaginatedResultsDto(
      GetPostDto.factory(GetPostDto, posts),
      count,
      pageNumber,
      pageSize,
    );
  }

  @ApiOperation({
    description: "Method to list post by category id",
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.FORBIDDEN_RESOURCE,
    status: HttpStatus.FORBIDDEN,
  })
  @Get("/category/:categoryId")
  async findManyPostsByCategoryId(
    @Query(ValidationPipe) filter: FilterPostDto,
    @Param("categoryId") categoryId: string,
  ) {
    const { page, pageSize } = filter;
    const pageNumber = Number(page ?? 0);
  
    const { posts, count } = await this.getPostsByCategoryId.execute({
      categoryId,
      filter,
    });
  
    return new PaginatedResultsDto(
      GetPostDto.factory(GetPostDto, posts),
      count,
      pageNumber,
      pageSize,
    );
  }
}
