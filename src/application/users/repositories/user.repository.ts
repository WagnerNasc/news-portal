import { User } from "@prisma/client";
import { ICreateUser } from "../interfaces/create-user.interface";

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract create(user: ICreateUser): Promise<User>;
}
