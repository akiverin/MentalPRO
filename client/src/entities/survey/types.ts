import { QuestionModel } from '../question/model';

export interface Survey {
  _id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  ranges: {
    section: string;
    thresholds: { min: number | ''; max: number | ''; title: string; color: string }[];
  }[];
  details?: string;
  results?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyCreate {
  title: string;
  description: string;
  image: string;
  time: string;
  ranges: {
    section: string;
    thresholds: { min: number | ''; max: number | ''; title: string; color: string }[];
  }[];
  questions: (string | undefined)[];
  details?: string;
  results?: string;
}

export interface SurveysResponse {
  data: Survey[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface QuestionsResponse {
  surveyId: string;
  questions: QuestionModel[];
}
