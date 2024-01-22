import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';

export interface UserProps {
  name: string;
  updatedAt?: Date | null;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get updatedAt(): Date | null | undefined {
    const updatedAt = this.props.updatedAt;

    return updatedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
