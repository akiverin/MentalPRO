import { makeAutoObservable, runInAction } from 'mobx';

interface ThresholdErrors {
  min: string;
  max: string;
  title: string;
  color: string;
}

interface SectionErrors {
  section: string;
  thresholds: ThresholdErrors[];
}

interface SurveyErrors {
  title: string;
  description: string;
  details: string;
  time: string;
  results: string;
  image: string;
  ranges: SectionErrors[];
}

export class SurveyFormStore {
  title = '';
  description = '';
  details = '';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  time: '';
  questions: string[] = [];
  image: File | '' = '';
  isActive = true;
  results = '';

  ranges: {
    section: string;
    thresholds: { min: number | ''; max: number | ''; title: string; color: string }[];
  }[] = [];

  errors: SurveyErrors = {
    title: '',
    description: '',
    details: '',
    results: '',
    time: '',
    image: '',
    ranges: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setField(field: 'title' | 'description' | 'details' | 'results' | 'time' | 'image' | 'ranges', value: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any)[field] = value;
    runInAction(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.errors as any)[field] = '';
    });
  }

  // Методы управления секциями
  addSection() {
    this.ranges.push({ section: '', thresholds: [] });
    this.errors.ranges.push({ section: '', thresholds: [] });
  }

  removeSection(index: number) {
    this.ranges.splice(index, 1);
    this.errors.ranges.splice(index, 1);
  }

  setSection(index: number, value: string) {
    this.ranges[index].section = value;
    this.errors.ranges[index].section = '';
  }

  // Методы управления порогами внутри секции
  addThreshold(sectionIndex: number) {
    this.ranges[sectionIndex].thresholds.push({ min: '', max: '', title: '', color: '' });
    this.errors.ranges[sectionIndex].thresholds.push({ min: '', max: '', title: '', color: '' });
  }

  removeThreshold(sectionIndex: number, threshIndex: number) {
    this.ranges[sectionIndex].thresholds.splice(threshIndex, 1);
    this.errors.ranges[sectionIndex].thresholds.splice(threshIndex, 1);
  }

  setThresholdField(sectionIndex: number, threshIndex: number, field: keyof ThresholdErrors, value: string | number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.ranges[sectionIndex].thresholds[threshIndex][field] = value;
    runInAction(() => {
      this.errors.ranges[sectionIndex].thresholds[threshIndex][field] = '';
    });
  }

  // Валидация
  private validateTitle() {
    if (!this.title) return 'Заголовок обязателен';
    if (this.title.length > 255) return 'Макс. длина 255 символов';
    return '';
  }

  private validateDescription() {
    if (!this.description) return 'Описание обязательно';
    return '';
  }

  private validateResults() {
    return '';
  }

  private validateDetails() {
    if (!this.details) return 'Детали обязательны';
    return '';
  }

  private validateTime() {
    if (this.time === null || Number(this.time) === 0) return 'Время прохождения обязательно';
    if (Number(this.time) < 0) return 'Время должно быть неотрицательным числом';
    return '';
  }

  private validateImage() {
    return '';
  }

  private validateRanges() {
    const sectionErrors: SectionErrors[] = [];

    this.ranges.forEach((sec, i) => {
      const secErr: SectionErrors = { section: '', thresholds: [] };
      if (!sec.section) secErr.section = 'Название секции обязательно';

      if (!sec.thresholds.length) {
        secErr.thresholds.push({ min: 'Добавьте хотя бы один порог', max: '', title: '', color: '' });
      } else {
        sec.thresholds.forEach((t, j) => {
          const tErr: ThresholdErrors = { min: '', max: '', title: '', color: '' };
          if (t.min === '' || typeof t.min !== 'number') tErr.min = 'Минимум обязателен';
          if (t.max === '' || typeof t.max !== 'number') tErr.max = 'Максимум обязателен';
          if (typeof t.min === 'number' && typeof t.max === 'number' && t.max < t.min)
            tErr.max = 'Максимум должен быть ≥ минимум';
          if (!t.title) tErr.title = 'Заголовок порога обязателен';
          if (!/^#([0-9A-F]{3}){1,2}$/i.test(t.color)) tErr.color = 'Цвет должен быть в формате hex';
          secErr.thresholds[j] = tErr;
        });
      }

      sectionErrors[i] = secErr;
    });

    return sectionErrors;
  }

  validateAll() {
    const eTitle = this.validateTitle();
    const eDesc = this.validateDescription();
    const eDetails = this.validateDetails();
    const eTime = this.validateTime();
    const eImg = this.validateImage();
    const eRanges = this.validateRanges();
    const eResults = this.validateResults();

    runInAction(() => {
      this.errors = {
        title: eTitle,
        description: eDesc,
        details: eDetails,
        time: eTime,
        results: eResults,
        image: eImg,
        ranges: eRanges,
      };
    });

    const baseOk = !eTitle && !eDesc && !eDetails && !eTime && !eImg;
    const rangesOk = eRanges.every(
      (secErr) => !secErr.section && secErr.thresholds.every((te) => !te.min && !te.max && !te.title && !te.color),
    );

    return baseOk && rangesOk;
  }
}
