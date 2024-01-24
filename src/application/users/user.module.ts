import { DatabaseModule } from "~/infra/database/database.module";
import { UsersController } from "./controllers/users.controller";
import { CreateUser } from "./use-cases/create-user";
import { Module } from "@nestjs/common";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    CreateUser
  ],
})

export class UserModule {}
