import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsUUID } from "class-validator";
import { PaginateDto } from "~/commons/dtos";

export class FilterPostDto extends PaginateDto {
  @ApiPropertyOptional({
    example: "5a5040a5-6b69-47a4-9da4-69273dc3bb21",
  })
  @IsOptional()
  @IsUUID()
  @Type(() => String)
  authorId?: string;

  @ApiPropertyOptional({
    example: "5a5040a5-6b69-47a4-9da4-69273dc3bb21",
  })
  @IsOptional()
  @IsUUID()
  @Type(() => String)
  categoryId?: string;
}
