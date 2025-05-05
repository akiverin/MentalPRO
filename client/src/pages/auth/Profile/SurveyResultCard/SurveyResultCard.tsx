import { FC } from 'react';
import './SurveyResultCard.scss';
import formatDate from '@/utils/formatDate';
import { QuestionModel } from '@/entities/question/model';
import { AnswerModel } from '@/entities/answer/model';
import TheLink from '@/components/ui/Link/Link'; // Исправлен путь импорта
import { SurveyModel } from '@/entities/survey/model';
import Chart from '@/components/Chart';
import Badge from '@/components/ui/Badge/Badge';

interface SurveyResultCardProps {
  survey: SurveyModel | null;
  createdAt: string;
  answers: {
    questionId: QuestionModel | null;
    answerId: AnswerModel | null;
  }[];
  className?: string;
}

const isValidAnswer = (answer: { questionId: QuestionModel | null; answerId: AnswerModel | null }): boolean => {
  return !!answer.questionId && !!answer.answerId && typeof answer.answerId.points === 'number';
};

const SurveyResultCard: FC<SurveyResultCardProps> = ({ survey, createdAt, answers, className = '' }) => {
  if (!survey || !survey.title) {
    return null;
  }

  const validAnswers = answers.filter(isValidAnswer);

  if (validAnswers.length === 0) {
    return null;
  }

  const ranges = survey.ranges;

  if (!ranges || !ranges.length || !ranges[0].thresholds || !ranges[0].thresholds.length) {
    return null;
  }

  const thresholds = ranges[0].thresholds;
  const max = Math.max(
    ...thresholds.map((threshold) => threshold.max).filter((value): value is number => typeof value === 'number'),
  );

  const score = validAnswers.reduce((acc, answer) => acc + (answer.answerId?.points || 0), 0);

  return (
    <div className={`survey-result ${className}`}>
      <div className="survey-result__info">
        <div className="survey-result__details">
          <TheLink to={`/surveys/${survey._id}`} className="survey-result__title">
            {survey.title}
          </TheLink>
          <p className="survey-result__date">{formatDate(createdAt)}</p>
        </div>
        <Badge>
          Баллы: {score} / {max}
        </Badge>
      </div>
      {ranges.map((section, index) => (
        <div key={index} className="survey-result__section">
          <p>
            Секция: <b>{section.section}</b>
          </p>
          <Chart ranges={section.thresholds} value={score} />
        </div>
      ))}
    </div>
  );
};

export default SurveyResultCard;
