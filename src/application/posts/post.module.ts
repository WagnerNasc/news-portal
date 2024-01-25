import { DatabaseModule } from "~/infra/database/database.module";
import { PostsController } from "./controllers/posts.controller";
import { CreatePost } from "./use-cases/create-post";
import { Module } from "@nestjs/common";
import { GetAllPosts } from "./use-cases/get-all-posts";
import { UploadImagePost } from "./use-cases/upload-image-post";

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [CreatePost, GetAllPosts, UploadImagePost],
})
export class PostModule {}
