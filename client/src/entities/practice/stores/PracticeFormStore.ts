import { makeAutoObservable, runInAction } from 'mobx';

interface PracticeErrors {
  title: string;
  description: string;
  category: string;
  content: string;
  image: string;
}

export class PracticeFormStore {
  title = '';
  description = '';
  category = '';
  content = '';
  image: File | string | null = '';

  errors: PracticeErrors = {
    title: '',
    description: '',
    category: '',
    content: '',
    image: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setField<T extends keyof PracticeFormStore>(field: T, value: PracticeFormStore[T]) {
    (this as PracticeFormStore)[field] = value;
    runInAction(() => {
      this.errors[field as keyof PracticeErrors] = '';
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
  private validateCategory() {
    if (!this.category.trim()) return 'Категория обязательна';
    return '';
  }
  private validateContent() {
    if (!this.content) return 'Содержимое обязательно';
    return '';
  }

  validateAll() {
    const e = {
      title: this.validateTitle(),
      description: this.validateDescription(),
      category: this.validateCategory(),
      content: this.validateContent(),
      image: '',
    };
    runInAction(() => {
      this.errors = e;
    });
    return !Object.values(e).some(Boolean);
  }
}
