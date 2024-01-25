import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ICreateUser } from "../../interfaces/create-user.interface";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { PrismaService } from "~/infra/database/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class PrismaUserRepository {
  private readonly logger = new Logger(PrismaUserRepository.name);

  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async create(user: ICreateUser): Promise<User> {
    try {
      return this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }
  }
}
