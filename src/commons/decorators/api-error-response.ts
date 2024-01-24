import { applyDecorators, Type } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

interface IParams<TModel extends Type<any>> {
  message?: TModel;
  status?: number;
  description?: string;
}

export const ApiErrorResponse = ({ message, status, description }: IParams<any>) => {
  const statusCode = status ?? 400;

  return applyDecorators(
    ApiResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { type: "integer", example: statusCode },
              body: {
                properties: {
                  status: { type: "string", example: "error" },
                  errors: { type: "string", example: message },
                },
              },
            },
          },
        ],
      },
      status: statusCode,
      description,
    }),
  );
};
