import { makeAutoObservable, runInAction } from "mobx";

export class LoginFormStore {
  email = "";
  password = "";
  errors: Record<"email" | "password", string> = {
    email: "",
    password: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: "email" | "password", value: string) {
    this[field] = value;
    this.errors[field] = "";
  }

  private validateIdentifier() {
    if (!this.email) return "Email is required";
    return "";
  }
  private validatePassword() {
    if (!this.password) return "Password is required";
    if (this.password.length < 6) return "At least 6 characters";
    return "";
  }

  validateAll(): boolean {
    const e1 = this.validateIdentifier();
    const e2 = this.validatePassword();
    runInAction(() => {
      this.errors = { email: e1, password: e2 };
    });
    return !e1 && !e2;
  }
}
