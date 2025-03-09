import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import staiImage from "@assets/images/surveys/staiImage.webp";

interface Survey {
  id: number;
  name: string;
  description: string;
  details?: string;
  image?: string;
  result?: string;
  time: string;
  link: string;
}

interface SurveysState {
  surveys: Survey[];
}

const initialState: SurveysState = {
  surveys: [
    {
      id: 0,
      name: "Опросник Спилбергера – Ханина (STAI)",
      description:
        "Тест из 40 утверждений, которые нужно оценить по шкале соответствия:  «Нет, это не так», «Пожалуй, так», «Верно» или «Совершенно верно».  Опросник Спилберга – Ханина подходит для самостоятельной оценки своего состояния.",
      details:
        "Данный опрос проверенный временем и сотнями исследований метод оценки тревожности; есть  разделение тревоги и личностной тревожности; утверждения для оценки  сформулированы понятно и не вызывают ступора.",
      image: staiImage,
      result:
        "шкала от 0 до 35 баллов. Зелёный сектор от 0 до 17 говорит об отсутствии тревоги, жёлтый до 24 — о средней выраженности тревожного расстройства, красный от 24 – о тяжёлом течении.",
      time: "7 мин.",
      link: "stai",
    },
    {
      id: 1,
      name: "Госпитальная шкала тревоги и депрессии (HADS)",
      description:
        "Один из самых простых и популярных тестов на тревожность. В нём всего 14 вопросов о состоянии человека за последнюю неделю. В некоторых нужно определить частоту симптомов за последнюю неделю, в других — их актуальность.",
      details:
        "Простота и скорость прохождения; возможность разграничить депрессивные и тревожные симптомы; доказательность в качестве метода диагностики.",
      result:
        "две шкалы от 0 до 21 балла. Первая отражает уровень тревоги, вторая — депрессии.",
      time: "3 мин.",
      link: "hads",
    },
    {
      id: 3,
      name: "Шкала тревоги Бека (BAI)",
      description:
        "21 вопрос о физиологических проявлениях тревоги, о страхах и нервозности. В каждом вопросе указан отдельный симптом, и нужно оценить, беспокоил ли он вас в течение недели.",
      details:
        "Охвачены основные проявления тревоги; тест надёжен и подходит для самодиагностики; варианты ответов не категоричны и не оставляют сомнений в выборе пункта.",
      result:
        "шкала, разделённая на сектора незначительной, лёгкой, средней и высокой тревоги.",
      time: "4 мин.",
      link: "bai",
    },
    {
      id: 4,
      name: "Шкала Гамильтона (HARS)",
      description:
        "14 симптомов тревоги, наличие которых  специалист оценивает в пяти вариантах: отсутствует, выражен слабо или  умеренно, наблюдается в тяжёлой или в крайне тяжёлой степени.",
      details:
        "Быстрый тест с доказанной надёжностью и хорошо описанными симптомами тревожности (физиологическими, эмоциональными и поведенческими).",
      result:
        "шкала от 0 до 35 баллов. Зелёный сектор (от 0 до 17) говорит об отсутствии тревоги, жёлтый (до 24) — о средней выраженности тревожного расстройства, красный (от 24) — о тяжёлом течении.",
      time: "3 мин.",
      link: "hars",
    },
    {
      id: 5,
      name: "Шкала самооценки тревоги Шихана (SPRAS)",
      description:
        "Тест на актуальность симптомов в течение последней недели. Для шкалы тревоги Шихана предстоит оценить 35 тезисов.",
      details:
        "Редкий тест, в котором учтены ощущения дереализации и деперсонализации, которые могут случаться при высокой тревоге и тревожности.",
      result:
        "шкала от 0 до 140 баллов показывает, есть ли у человека клинически значимые симптомы тревоги.",
      time: "6 мин.",
      link: "spras",
    },
    {
      id: 6,
      name: "Шкала самооценки тревоги Цунга (SAS)",
      description:
        "Шкала из 20 утверждений, например: «Моё лицо горит и краснеет» или «Я легко засыпаю и чувствую себя отдохнувшим при пробуждении». Нужно оценить каждый из предложенных тезисов по частоте проявлений за последнюю неделю.",
      details:
        "Скорость прохождения; наглядный результат; проверенная достоверность; применимость и в клинической диагностике, и самооценке тревоги.",
      result:
        "шкала от 20 до 80 баллов. До 44 баллов — норма, а большее количество указывает на тревожное расстройство разной степени тяжести.",
      time: "3 мин.",
      link: "sas",
    },
    {
      id: 7,
      name: "Пенсильванский опросник беспокойства, PSWQ",
      description:
        "16 вопросов шкалы сконцентрированы на характере тревоги: здесь нет утверждений о физиологических симптомах, акцент сделан на способности осознавать, контролировать и успокаивать своё беспокойство.",
      details:
        "Тест сосредоточен на предварительной диагностике генерализованного тревожного расстройства. Узкий профиль позволяет отделить людей с таким потенциальным диагнозом от тех, кто страдает другими формами расстройств, связанных с тревогой и страхом. А ещё тем, кто только встаёт на путь осознания проблемы, многие вопросы покажут, на что обратить внимание.",
      result:
        "шкала от 16 до 69 баллов. Интерпретация поможет установить хронический, отсутствующий или умеренный статус беспокойства.",
      time: "3 мин.",
      link: "pswq",
    },
    {
      id: 8,
      name: "Шкала социальной тревожности Либовица (LSAS)",
      description:
        "48 вопросов на выявление симптомов социофобии (социальной тревожности). Люди с таким диагнозом боятся и зачастую избегают ситуаций общения (конкретных или любых) и взаимодействия с другими.",
      details:
        "Подробные результаты, акцентирующие внимание на специфике проблемы.",
      result:
        "в финале представлено несколько шкал, разделённых на три блока. Первая оценивает общий уровень социофобии. Следующие две шкалы (второй блок) показывают, насколько человек боится социальных ситуаций (1) и как часто он их избегает (2). Третий блок конкретизирует проблемные зоны и выявляет, что именно вызывает больший стресс (межличностный контакт, формальное общение или общественные места).",
      time: "5 мин.",
      link: "lsas",
    },
  ],
};

const surveysSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    addSurvey: (state, action: PayloadAction<Survey>) => {
      state.surveys.push(action.payload);
    },
  },
});

export const { addSurvey } = surveysSlice.actions;
export default surveysSlice.reducer;
