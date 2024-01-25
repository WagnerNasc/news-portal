import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateCategory } from "../use-cases/create-category";
import { CreateCategoryDto, GetCategoryDto } from "../dtos";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { ApiErrorResponse } from "~/commons/decorators/api-error-response";
import { ApiDefaultResponse } from "~/commons/decorators/api-response";

@ApiTags("Category")
@ApiExtraModels(GetCategoryDto)
@Controller("categories")
export class CategoriesController {
  constructor(private readonly createCategory: CreateCategory) {}

  @ApiOperation({
    description: "Method to create the category",
  })
  @ApiDefaultResponse({
    model: GetCategoryDto,
    status: HttpStatus.CREATED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiErrorResponse({
    message: ExceptionsConstants.FORBIDDEN_RESOURCE,
    status: HttpStatus.FORBIDDEN,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    const category = await this.createCategory.execute({
      ...createCategoryDto,
    });

    return GetCategoryDto.factory(GetCategoryDto, category);
  }
}
