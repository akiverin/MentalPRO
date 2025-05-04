import { AnswerModel } from '../answer/model';
import { QuestionModel } from '../question/model';
import { SurveyModel } from '../survey/model';

export interface Result {
  _id: string;
  surveyId: SurveyModel;
  userId: string;
  answers: {
    // questionId: string;
    // answerId: string;
    questionId: QuestionModel;
    answerId: AnswerModel;
  }[];
  createdAt: string;
  updatedAt: string;
}
