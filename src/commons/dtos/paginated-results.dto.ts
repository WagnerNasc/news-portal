import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResultsDto<T = any> {
  @ApiProperty({
    example: () => [],
  })
  rows: T[];

  @ApiProperty({ example: 0 })
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  count: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any, count: number, page: number, pageSize: number) {
    this.rows = data;
    this.count = count ?? 0;
    this.page = page ?? 0;
    this.pageSize = pageSize ?? 10;
  }
}
