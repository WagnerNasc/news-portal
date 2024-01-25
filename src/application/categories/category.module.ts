import { DatabaseModule } from "~/infra/database/database.module";
import { CategoriesController } from "./controllers/categories.controller";
import { CreateCategory } from "./use-cases/create-category";
import { Module } from "@nestjs/common";

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CreateCategory],
})
export class CategoryModule {}
