import { applyDecorators, Type } from "@nestjs/common";
import { ApiResponse, getSchemaPath } from "@nestjs/swagger";

interface IParams<TModel extends Type<any>> {
  model?: TModel;
  isArray?: boolean;
  status?: number;
  description?: string;
}

export const ApiDefaultResponse = ({ model, isArray, status, description }: IParams<any>) => {
  const values = isArray
    ? { items: { $ref: getSchemaPath(model) } }
    : { $ref: getSchemaPath(model) };
  const data = model ? values : undefined;
  const statusCode = status ?? 200;
  const body = data
    ? {
        body: {
          properties: {
            data,
          },
        },
      }
    : null;

  return applyDecorators(
    ApiResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { type: "integer", example: statusCode },
              ...body,
            },
          },
        ],
      },
      status: statusCode,
      description,
    }),
  );
};
