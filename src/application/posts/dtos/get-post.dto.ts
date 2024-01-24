import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BaseDto } from "commons/dtos";

export class GetPostDto extends BaseDto {
  @ApiProperty({ example: "5a5040a5-6b69-47a4-9da4-69273dc3bb21" })
  @Expose()
  id: string;

  @ApiProperty({ example: "Sample title" })
  @Expose()
  title: string;

  @ApiProperty({ example: "Sample content" })
  @Expose()
  content: string;

  @ApiProperty({ example: "Sample path image" })
  @Expose()
  image: string;
}
