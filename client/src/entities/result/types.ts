// import { AnswerModel } from '../answer/model';
// import { QuestionModel } from '../question/model';

export interface Result {
  _id: string;
  surveyId: string;
  userId: string;
  answers: {
    questionId: string;
    answerId: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
