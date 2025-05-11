import { makeAutoObservable, runInAction } from 'mobx';

export class UserFormStore {
  firstName = '';
  lastName = '';
  email = '';
  image: '' | File | null = null;
  errors: Record<'email' | 'image' | 'firstName' | 'lastName', string> = {
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: 'email' | 'firstName' | 'lastName' | 'image', value: string | File) {
    (this[field] as string | File) = value;
    this.errors[field] = '';
  }

  private validateEmail() {
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

  private validateImage() {
    return '';
  }

  validateAll(): boolean {
    const e1 = this.validateFirstName();
    const e2 = this.validateLastName();
    const e3 = this.validateEmail();
    const e4 = this.validateImage();
    runInAction(() => {
      this.errors = { firstName: e1, lastName: e2, email: e3, image: e4 };
    });
    return !e1 && !e2 && !e3 && !e4;
  }
}
