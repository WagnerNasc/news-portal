import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ExceptionsConstants } from "commons/consts/exceptions";
import { ICreateUser } from "../interfaces/create-user.interface";
import { UserRepository } from "../repositories/user.repository";
import { PrismaUserRepository } from "../repositories/prisma/prisma-user.repository";


@Injectable()
export class CreateUser {
  constructor(
    private userRepository: PrismaUserRepository,
  ) {}

  async execute(params: ICreateUser) {
    const { email } = params;

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new BadRequestException(ExceptionsConstants.USER_EMAIL_ALREADY_EXISTS)
    }

    const user = await this.userRepository.create(params);

    return user;
  }
}
