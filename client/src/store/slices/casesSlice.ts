import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import imageCase01 from "@assets/images/cases/imageCase01.webp";
import imageCase02 from "@assets/images/cases/imageCase02.webp";
import imageCase03 from "@assets/images/cases/imageCase03.webp";

interface Case {
  id: number;
  name: string;
  category: string;
  description: string;
  text: string;
  image?: string;
  link: string;
}

interface CasesState {
  cases: Case[];
}

const initialState: CasesState = {
  cases: [
    {
      id: 0,
      name: "Дыхательная техника вашего умиротворения",
      category: "Дыхательные упражнения",
      description:
        "Как уметь успокоиться и привести тела в и разум в норму. Инструкция и видеоурок для тренировки.",
      text: "Данный опрос проверенный временем и сотнями исследований метод оценки тревожности; есть  разделение тревоги и личностной тревожности; утверждения для оценки  сформулированы понятно и не вызывают ступора.",
      image: imageCase01,
      link: "breathing",
    },
    {
      id: 1,
      name: "Тайм-менеджмент или как все и везде успеть, при этом не поддаваясь панике и не быть слишком",
      category: "Тайм-менеджмент",
      description:
        "Управляйте своим временем используя тайм-менеджмент и медитационные практические навыки. Несколько советов для организации вашей жизни и досуга.",
      text: "Данный опрос проверенный временем и сотнями исследований метод оценки тревожности; есть  разделение тревоги и личностной тревожности; утверждения для оценки  сформулированы понятно и не вызывают ступора.",
      image: imageCase02,
      link: "time-management-and-all",
    },
    {
      id: 2,
      name: "Медитация – путь к развитию своего благополучия ",
      category: "Медитация",
      description:
        "Универсальная тренировка очищения разума от навязчивых мыслей и идей. Путь к самопознанию и спокойствию во всем.",
      text: "Данный опрос проверенный временем и сотнями исследований метод оценки тревожности; есть  разделение тревоги и личностной тревожности; утверждения для оценки  сформулированы понятно и не вызывают ступора.",
      image: imageCase03,
      link: "meditation-path",
    },
  ],
};

const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    addCase: (state, action: PayloadAction<Case>) => {
      state.cases.push(action.payload);
    },
  },
});

export const { addCase } = casesSlice.actions;
export default casesSlice.reducer;
