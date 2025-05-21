import { randomUUID } from "crypto";
import { CreateUserDto } from "../dto/userDto";
import { CreateInsightDto } from "../dto/insightsDto";

interface InsightProps extends CreateInsightDto {
  userId: string;
}

export class Insight {
  private props: InsightProps;
  private _id: string;

  constructor(props: InsightProps, id?: string) {
    this.props = {
      ...props,
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get tags(): string[] {
    return this.props.tags;
  }

  set tags(tags: string[]) {
    this.props.tags = tags;
  }
}
