import { makeAutoObservable, runInAction } from 'mobx';

export class UserFormStore {
  firstName = '';
  lastName = '';
  patronymic = '';
  email = '';
  image: '' | File | null = null;
  errors: Record<'email' | 'image' | 'firstName' | 'lastName' | 'patronymic', string> = {
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    image: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: 'email' | 'firstName' | 'lastName' | 'image' | 'patronymic', value: string | File) {
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

  private validatePatronymic() {
    return '';
  }
  private validateImage() {
    return '';
  }

  validateAll(): boolean {
    const e1 = this.validateFirstName();
    const e2 = this.validateLastName();
    const e3 = this.validatePatronymic();
    const e4 = this.validateEmail();
    const e5 = this.validateImage();
    runInAction(() => {
      this.errors = { firstName: e1, lastName: e2, patronymic: e3, email: e4, image: e5 };
    });
    return !e1 && !e2 && !e3 && !e4;
  }
}
