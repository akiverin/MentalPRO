export interface Answer {
  _id: string;
  number: number;
  text: string;
  points: number;
}

export interface AnswerCreate {
  number: number;
  text: string;
  points: number;
}
