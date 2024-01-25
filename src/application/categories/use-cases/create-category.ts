import { Injectable } from "@nestjs/common";
import { ICreateCategory } from "../interfaces/create-category.interface";
import { PrismaCategoryRepository } from "../repositories/prisma/prisma-category.repository";

@Injectable()
export class CreateCategory {
  constructor(private categoryRepository: PrismaCategoryRepository) {}

  async execute(params: ICreateCategory) {
    return this.categoryRepository.create(params);
  }
}
