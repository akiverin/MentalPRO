import { useParams } from 'react-router-dom';
import Button from '@/components/ui/Button/Button';
import './Quest.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { surveyListStore } from '@entities/survey/stores/surveyStoreInstance';
import { observer } from 'mobx-react-lite';
import { AnswerModel } from '@entities/answer/model';
import { QuestionModel } from '@entities/question/model';
import { resultStore } from '@entities/result/store/resultStoreInstance';
import { ResultModel } from '@entities/result/model';

const Quest = observer(() => {
  const { link } = useParams<{ link: string }>();

  useEffect(() => {
    if (link) {
      surveyListStore.fetchQuestions(link);
      surveyListStore.fetchSurveyById(link);
    }
  }, [link]);

  const questions = surveyListStore.questions;
  const survey = surveyListStore.survey;

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = localStorage.getItem(`survey-${link}-current`);
    return saved && !isNaN(+saved) ? +saved : 0;
  });

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(`survey-${link}-answers`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (link) {
      localStorage.setItem(`survey-${link}-current`, String(currentIndex));
    }
  }, [currentIndex, link]);

  const currentQuestion = questions[currentIndex] as QuestionModel;

  const handleSelectAnswer = (answerId: string) => {
    if (!currentQuestion) return;
    const updated = { ...answers, [currentQuestion._id]: answerId };
    setAnswers(updated);
    if (link) {
      localStorage.setItem(`survey-${link}-answers`, JSON.stringify(updated));
    }
  };

  const isSelected = (answerId: string) => {
    return currentQuestion?.answers?.some(
      (ans: AnswerModel) => ans._id === answerId && answers[currentQuestion._id] === answerId,
    );
  };

  if (!questions.length || !survey || !currentQuestion) {
    return <h2 className="survey__not-found">Опрос или вопросы не найдены</h2>;
  }

  const saveResults = () => {
    const result = {
      surveyId: link,
      answers: Object.entries(answers).map(([questionId, answerId]) => ({
        questionId,
        answerId,
      })),
    };
    console.log('result', result);
    resultStore.fetchCreate(result as unknown as ResultModel);
    localStorage.removeItem(`survey-${link}-answers`);
    localStorage.removeItem(`survey-${link}-current`);
    alert('Ваши ответы отправлены!');
  };

  return (
    <section className="quest">
      <div className="quest__wrapper">
        <div className="quest__control">
          <div className="quest__survey-info">
            <p className="quest__nums">
              {currentIndex + 1} из {questions.length}{' '}
            </p>
            <h1 className="quest__title">{survey.title}</h1>
            <p className="quest__save">Результаты сохраняются локально</p>
          </div>
          <ul className="quest__question-lines">
            {questions.map((q, index) => (
              <li
                key={index}
                className={classNames(
                  'quest__question-line',
                  answers[q._id] !== undefined && 'quest__question-line--complete',
                  index === currentIndex && 'quest__question-line--active',
                )}
              />
            ))}
          </ul>
        </div>
        <motion.div
          key={currentQuestion._id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="quest__content"
        >
          <p className="quest__question-num">Вопрос {currentIndex + 1}</p>
          <h2 className="quest__question-title">{currentQuestion.text ?? 'Ошибка загрузки вопроса'}</h2>
          <div className="quest__answers">
            {currentQuestion.answers.map((answer: AnswerModel, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(answer._id)}
                className={classNames('quest__answer', {
                  'quest__answer--selected': isSelected(answer._id),
                })}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </motion.div>
        <div className="quest__actions">
          <Button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            variant="rounded"
            background="light"
            disabled={currentIndex === 0}
          >
            Предыдущий вопрос
          </Button>
          {currentIndex === questions.length - 1 ? (
            <Button
              onClick={saveResults}
              variant="rounded"
              background="primary"
              disabled={Object.keys(answers).length !== questions.length}
            >
              Завершить опрос
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              variant="rounded"
              background="primary"
              disabled={!answers[currentQuestion._id]}
            >
              Следующий вопрос
            </Button>
          )}
        </div>
      </div>
    </section>
  );
});

export default Quest;
