import { IsNumber, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PaginateDto {
  @ApiPropertyOptional({ type: Number, example: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page = 0;

  @ApiPropertyOptional({ type: Number, example: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize = 10;
}
