import { Category } from "@prisma/client";
import { ICreateCategory } from "../interfaces/create-category.interface";

export abstract class CategoryRepository {
  abstract create(category: ICreateCategory): Promise<Category>;
}
