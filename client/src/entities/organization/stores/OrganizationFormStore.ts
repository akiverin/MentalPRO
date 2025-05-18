import { makeAutoObservable, runInAction } from 'mobx';

interface OrganizationErrors {
  title: string;
  description: string;
  image: string;
}

export class OrganizationFormStore {
  title = '';
  description = '';
  image: File | string | null = '';

  errors: OrganizationErrors = {
    title: '',
    description: '',
    image: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setField<T extends keyof OrganizationFormStore>(field: T, value: OrganizationFormStore[T]) {
    (this as OrganizationFormStore)[field] = value;
    runInAction(() => {
      this.errors[field as keyof OrganizationErrors] = '';
    });
  }

  private validateTitle() {
    if (!this.title.trim()) return 'Заголовок обязателен';
    if (this.title.length > 255) return 'Максимум 255 символов';
    return '';
  }
  private validateDescription() {
    if (!this.description.trim()) return 'Описание обязательно';
    return '';
  }

  validateAll() {
    const e = {
      title: this.validateTitle(),
      description: this.validateDescription(),
      image: '',
    };
    runInAction(() => {
      this.errors = e;
    });
    return !Object.values(e).some(Boolean);
  }
}
