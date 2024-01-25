import { CommonFilter } from "~/commons/interfaces/filter.interface";

export interface WherePost extends CommonFilter {
  authorId?: string;
  categoryId?: string;
}
