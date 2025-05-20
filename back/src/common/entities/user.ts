import { randomUUID } from "crypto";
import { CreateUserDto } from "../dto/userDto";

export class User {
  private props: CreateUserDto;
  private _id: string;

  constructor(props: CreateUserDto, id?: string) {
    this.props = {
      ...props,
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }
}
