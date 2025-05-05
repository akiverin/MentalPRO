import { Practice } from "./types";

export class PracticeModel {
  constructor(private readonly data: Practice) {}

  get id() {
    return this.data._id;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get content() {
    return this.data.content;
  }

  get category() {
    return this.data.category;
  }

  get image() {
    return this.data.image || "";
  }

  get createdAt() {
    return new Date(this.data.createdAt).toLocaleDateString();
  }

  get updateAt() {
    return new Date(this.data.updatedAt).toLocaleDateString();
  }
}
