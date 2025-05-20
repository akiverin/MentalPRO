import { makeAutoObservable, runInAction } from 'mobx';

export class RegisterFormStore {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  privacy = false;
  hr = false;
  errors: Record<'email' | 'password' | 'firstName' | 'lastName' | 'privacy' | 'hr', string> = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    privacy: '',
    hr: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: 'email' | 'password' | 'firstName' | 'lastName' | 'privacy' | 'hr', value: string | boolean) {
    (this[field] as string | boolean) = value;
    this.errors[field] = '';
  }

  private validateIdentifier() {
    if (!this.email) return 'Email обязательное поле для заполнения';
    if (this.email.length > 320) return 'Email не может быть настолько большой длины';
    return '';
  }

  private validateFirstName() {
    if (!this.firstName) return 'Имя обязательное поле для заполнения';
    return '';
  }

  private validateLastName() {
    if (!this.lastName) return 'Фамилия обязательное поле для заполнения';
    return '';
  }

  private validatePassword() {
    if (!this.password) return 'Пароль обязательное поле для заполнения';
    if (this.password.length < 6) return 'Минимальная длина пароля 6 символов';
    return '';
  }

  private validatePrivacy() {
    if (!this.privacy) return 'Для регистрации необходимо подтвержить данное согласие';
    return '';
  }

  private validateHR() {
    return '';
  }

  validateAll(): boolean {
    const e1 = this.validateFirstName();
    const e2 = this.validateLastName();
    const e3 = this.validateIdentifier();
    const e4 = this.validatePassword();
    const e5 = this.validatePrivacy();
    const e6 = this.validateHR();
    runInAction(() => {
      this.errors = { firstName: e1, lastName: e2, email: e3, password: e4, privacy: e5, hr: e6 };
    });
    return !e1 && !e2 && !e3 && !e4 && !e5;
  }
}
