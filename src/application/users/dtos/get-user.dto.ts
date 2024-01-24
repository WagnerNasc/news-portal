import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BaseDto } from "commons/dtos";

export class GetUserDto extends BaseDto {
  @ApiProperty({ example: "5a5040a5-6b69-47a4-9da4-69273dc3bb21" })
  @Expose()
  id: string;

  @ApiProperty({ example: "Sample name" })
  @Expose()
  name: string;

  @ApiProperty({ example: "Sample email" })
  @Expose()
  email: string;
}
