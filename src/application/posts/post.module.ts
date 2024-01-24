import { DatabaseModule } from "~/infra/database/database.module";
import { PostsController } from "./controllers/posts.controller";
import { CreatePost } from "./use-cases/create-post";
import { Module } from "@nestjs/common";
import { GetAllPosts } from "./use-cases/get-all-posts";
import { GetPostsByAuthorId } from "./use-cases/get-posts-by-author-id";
import { GetPostsByCategoryId } from "./use-cases/get-posts-by-category-id";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    DatabaseModule, 
  ],
  controllers: [PostsController],
  providers: [
    CreatePost,
    GetAllPosts,
    GetPostsByAuthorId,
    GetPostsByCategoryId
  ],
})

export class PostModule {}
