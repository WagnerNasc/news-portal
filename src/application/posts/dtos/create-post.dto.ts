import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ example: "Sample title" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "Sample content" })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: "Sample path image" })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: "Sample content" })
  @IsOptional()
  @IsUUID()
  authorId: string;

  @ApiProperty({ example: "Sample path image" })
  @IsOptional()
  @IsUUID()
  categoryId: string;
}
