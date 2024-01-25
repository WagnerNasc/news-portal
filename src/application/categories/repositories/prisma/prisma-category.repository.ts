import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ICreateCategory } from "../../interfaces/create-category.interface";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { PrismaService } from "~/infra/database/prisma.service";
import { Category } from "@prisma/client";

@Injectable()
export class PrismaCategoryRepository {
  private readonly logger = new Logger(PrismaCategoryRepository.name);

  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Category | null> {
    try {
      const category = this.prisma.category.findUnique({
        where: {
          id,
        },
      });

      if (!category) {
        return null;
      }

      return category;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async create(category: ICreateCategory): Promise<Category> {
    try {
      return this.prisma.category.create({
        data: category,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }
}
