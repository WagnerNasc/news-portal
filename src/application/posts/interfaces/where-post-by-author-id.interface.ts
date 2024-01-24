import { CommonFilter } from "~/commons/interfaces/filter.interface";

export interface WherePostByAuthorId extends CommonFilter {
  authorId: string;
}
