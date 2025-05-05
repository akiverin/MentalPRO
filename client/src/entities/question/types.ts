export interface Question {
  _id: string;
  number: number;
  text: string;
  section: string;
  answers: [];
}

export interface QuestionCreate {
  number: number;
  text: string;
  section: string;
  answers: { number: number; text: string; points: number }[];
}
