import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Button from "@/components/ui/Button/Button";
import "./Quest.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

const Quest = () => {
  const { link } = useParams<{ link: string }>();
  const survey = useSelector((state: RootState) =>
    state.surveys.surveys.find((s) => s.link === link)
  );
  const questions = useSelector((state: RootState) => {
    return state.questions.questions.filter(
      (item) => survey !== undefined && item.survey_id === survey.id
    );
  });

  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem(`survey-${survey?.id}-answers`);
    return saved ? JSON.parse(saved) : {};
  });

  const [numQuestion, setNumQuestion] = useState(() => {
    const lastQuestion = localStorage.getItem(
      `survey-${survey?.id}-last-question`
    );
    return lastQuestion ? Number(lastQuestion) : 1;
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number>(
    answers[numQuestion] ?? -1
  );

  useEffect(() => {
    setSelectedAnswer(answers[numQuestion] ?? -1);
    localStorage.setItem(
      `survey-${survey?.id}-last-question`,
      String(numQuestion)
    );
  }, [numQuestion, answers, survey]);

  const handleSelectAnswer = (answerId: number) => {
    const newAnswers = { ...answers };

    if (answers[numQuestion] === answerId) {
      delete newAnswers[numQuestion];
    } else {
      newAnswers[numQuestion] = answerId;
    }

    setAnswers(newAnswers);
    localStorage.setItem(
      `survey-${survey?.id}-answers`,
      JSON.stringify(newAnswers)
    );
    setSelectedAnswer(newAnswers[numQuestion] ?? -1);
  };

  if (!survey || !questions.length) {
    return (
      <h2 className="survey__not-found">Опрос для прохождения не найден</h2>
    );
  }

  return (
    <section className="quest">
      <div className="quest__wrapper">
        <div className="quest__control">
          <div className="quest__survey-info">
            <p className="quest__nums">
              {numQuestion} из {questions[questions.length - 1].num}
            </p>
            <h1 className="quest__title">{survey.name}</h1>
            <p className="quest__save">Результаты сохраняются локально</p>
          </div>
          <ul className="quest__question-lines">
            {questions.map((question) => (
              <li
                key={question.id}
                className={classNames(
                  "quest__question-line",
                  answers[question.num] !== undefined &&
                    "quest__question-line--complete",
                  question.num === numQuestion && "quest__question-line--active"
                )}
              ></li>
            ))}
          </ul>
        </div>
        <motion.div
          key={numQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="quest__content"
        >
          <p className="quest__question-num">Вопрос {numQuestion}</p>
          <h2 className="quest__question-title">
            {questions[numQuestion - 1]?.text ?? "Ошибка загрузки вопроса"}
          </h2>
          <div className="quest__answers">
            {questions[numQuestion - 1].answers.map((answer) => (
              <button
                onClick={() => handleSelectAnswer(answer.id)}
                className={classNames(
                  "quest__answer",
                  answer.id === selectedAnswer && "quest__answer--selected"
                )}
                key={answer.id}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="quest__actions">
          <Button
            onClick={() => setNumQuestion((prev) => Math.max(1, prev - 1))}
            variant="rounded"
            background="light"
            disabled={numQuestion === 1}
          >
            Предыдущий вопрос
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem(`survey-${survey?.id}-answers`);
              localStorage.removeItem(`survey-${survey?.id}-last-question`);
              alert("Ваши ответы отправлены!");
            }}
            variant="rounded"
            background="primary"
            disabled={Object.keys(answers).length !== questions.length}
          >
            Завершить опрос
          </Button>
          <Button
            onClick={() =>
              setNumQuestion((prev) => Math.min(questions.length, prev + 1))
            }
            variant="rounded"
            background="primary"
            disabled={
              numQuestion === questions[questions.length - 1].num ||
              selectedAnswer === -1
            }
          >
            Следующий вопрос
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Quest;
