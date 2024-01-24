import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Sample name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "Sample email" })
  @IsNotEmpty()
  @IsString()
  email: string;
}
