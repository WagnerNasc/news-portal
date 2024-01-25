import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto, GetUserDto } from "../dtos";
import { CreateUser } from "../use-cases/create-user";

@ApiTags("User")
@ApiExtraModels(GetUserDto)
@Controller("users")
export class UsersController {
  constructor(private readonly createUser: CreateUser) {}

  @ApiOperation({
    description: "Method to create the user",
  })
  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const user = await this.createUser.execute({
      ...createUserDto,
    });

    return GetUserDto.factory(GetUserDto, user);
  }
}
