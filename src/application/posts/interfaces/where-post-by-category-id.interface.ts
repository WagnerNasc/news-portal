import { CommonFilter } from "~/commons/interfaces/filter.interface";

export interface WherePostByCategoryId extends CommonFilter {
  categoryId: string;
}
