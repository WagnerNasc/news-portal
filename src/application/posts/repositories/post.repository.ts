import { Post } from "@prisma/client";
import { ICreatePost } from "../interfaces/create-post.interface";

export abstract class PostRepository {
  abstract create(post: ICreatePost): Promise<Post>;
}
