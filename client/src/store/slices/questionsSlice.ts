import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Answer {
  id: number;
  score: number;
  text: string;
}

interface Question {
  id: number;
  num: number;
  survey_id: number;
  text: string;
  answers: Answer[];
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [
    {
      id: 1,
      num: 1,
      survey_id: 0,
      text: "Я спокоен.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 2,
      num: 2,
      survey_id: 0,
      text: "Мне ничто не угрожает.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 3,
      num: 3,
      survey_id: 0,
      text: "Я нахожусь в напряжении.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 4,
      num: 4,
      survey_id: 0,
      text: "Я испытываю сожаление.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 5,
      num: 5,
      survey_id: 0,
      text: "Я чувствую себя свободно.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 6,
      num: 6,
      survey_id: 0,
      text: "Я расстроен.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 7,
      num: 7,
      survey_id: 0,
      text: "Меня волнуют возможные неудачи.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 8,
      num: 8,
      survey_id: 0,
      text: "Я чувствую себя отдохнувшим.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 9,
      num: 9,
      survey_id: 0,
      text: "Я встревожен.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 10,
      num: 10,
      survey_id: 0,
      text: "Я испытываю чувство внутреннего удовлетворения.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 11,
      num: 11,
      survey_id: 0,
      text: "Я уверен в себе.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 12,
      num: 12,
      survey_id: 0,
      text: "Я нервничаю.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 13,
      num: 13,
      survey_id: 0,
      text: "Я не нахожу себе места.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 14,
      num: 14,
      survey_id: 0,
      text: "Я взвинчен.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 15,
      num: 15,
      survey_id: 0,
      text: "Я не чувствую скованности, напряженности.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 16,
      num: 16,
      survey_id: 0,
      text: "Я доволен.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 17,
      num: 17,
      survey_id: 0,
      text: "Я озабочен.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 18,
      num: 18,
      survey_id: 0,
      text: "Я слишком возбуждён и мне не по себе.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 19,
      num: 19,
      survey_id: 0,
      text: "Мне радостно.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 20,
      num: 20,
      survey_id: 0,
      text: "Мне приятно.",
      answers: [
        { id: 1, text: "Нет, это не так", score: 1 },
        { id: 2, text: "Пожалуй, так", score: 2 },
        { id: 3, text: "Верно", score: 3 },
        { id: 4, text: "Совершенно верно", score: 4 },
      ],
    },
    {
      id: 21,
      num: 21,
      survey_id: 0,
      text: "Я обычно испытываю удовольствие.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 22,
      num: 22,
      survey_id: 0,
      text: "Я обычно быстро устаю.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 23,
      num: 23,
      survey_id: 0,
      text: "Как правило, я легко могу заплакать.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 24,
      num: 24,
      survey_id: 0,
      text: "Я хотел(а) бы быть таким же счастливым, как другие.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 25,
      num: 25,
      survey_id: 0,
      text: "Нередко я проигрываю из-за того, что недостаточно быстро принимаю решения.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 26,
      num: 26,
      survey_id: 0,
      text: "Обычно я чувствую себя бодрым.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 27,
      num: 27,
      survey_id: 0,
      text: "Обычно я спокоен, хладнокровен и собран.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 28,
      num: 28,
      survey_id: 0,
      text: "Ожидаемые трудности обычно меня очень тревожат.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 29,
      num: 29,
      survey_id: 0,
      text: "Я слишком переживаю из-за пустяков.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 30,
      num: 30,
      survey_id: 0,
      text: "Я вполне счастлив.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 31,
      num: 31,
      survey_id: 0,
      text: "Я принимаю всё слишком близко к сердцу.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 32,
      num: 32,
      survey_id: 0,
      text: "Мне не хватает уверенности в себе.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 33,
      num: 33,
      survey_id: 0,
      text: "Обычно я чувствую себя в безопасности.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 34,
      num: 34,
      survey_id: 0,
      text: "Я стараюсь избегать критических ситуаций и трудностей.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 35,
      num: 35,
      survey_id: 0,
      text: "У меня бывает хандра.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 36,
      num: 36,
      survey_id: 0,
      text: "Как правило, я доволен.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 37,
      num: 37,
      survey_id: 0,
      text: "Всякие пустяки отвлекают и волнуют меня.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 38,
      num: 38,
      survey_id: 0,
      text: "Я так сильно переживаю свои разочарования, что потом долго не могу о них забыть.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 39,
      num: 39,
      survey_id: 0,
      text: "Я уравновешенный человек.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
    {
      id: 40,
      num: 40,
      survey_id: 0,
      text: "Меня охватывает сильное беспокойство, когда я думаю о своих делах и заботах.",
      answers: [
        { id: 1, text: "Почти никогда", score: 1 },
        { id: 2, text: "Иногда", score: 2 },
        { id: 3, text: "Часто", score: 3 },
        { id: 4, text: "Почти всегда", score: 4 },
      ],
    },
  ],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },
  },
});

export const { addQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
