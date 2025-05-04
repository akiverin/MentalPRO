import { FC } from 'react';
import './SurveyResultCard.scss';
import formatDate from '@/utils/formatDate';
import { QuestionModel } from '@/entities/question/model';
import { AnswerModel } from '@/entities/answer/model';
import TheLink from '@/components/ui/Link';
import { SurveyModel } from '@/entities/survey/model';
import Chart from '@/components/Chart';

interface SurveyResultCardProps {
  survey: SurveyModel;
  createdAt: string;
  answers: {
    questionId: QuestionModel;
    answerId: AnswerModel;
  }[];
  max?: number;
  className?: string;
}

const SurveyResultCard: FC<SurveyResultCardProps> = ({
  survey,
  createdAt,
  answers,
  max = answers.length * 4,
  className = '',
}) => {
  const initialScore = 0;
  const score = answers.reduce((accumulator, v) => accumulator + v.answerId.points, initialScore);
  const ranges = [
    { min: 0, max: 3, title: 'Низкий', color: '#4CAF50' },
    { min: 4, max: 8, title: 'Высокий', color: '#F44336' },
  ];
  return (
    <>
      <div className={`survey-result ${className}`}>
        <TheLink to={`/surveys/${survey.id}`} className="survey-result__title">
          {survey.title}
        </TheLink>
        <p className="survey-result__date">{formatDate(createdAt)}</p>
        <p className="survey-result__score">
          Баллы: {score} / {max}
        </p>
        <Chart ranges={ranges} value={score} />
      </div>
    </>
  );
};

export default SurveyResultCard;
