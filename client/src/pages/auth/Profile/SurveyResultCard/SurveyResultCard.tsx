import { FC } from 'react';
import './SurveyResultCard.scss';
import { QuestionModel } from '@/entities/question/model';
import { AnswerModel } from '@/entities/answer/model';
import TheLink from '@/components/ui/Link/Link'; // Исправлен путь импорта
import { SurveyModel } from '@/entities/survey/model';
import Chart from '@/components/Chart';
import Badge from '@/components/ui/Badge/Badge';

interface AnswerProps {
  questionId: QuestionModel | null;
  answerId: AnswerModel | null;
}

interface SurveyResultCardProps {
  survey: SurveyModel | null;
  createdAt: string;
  answers: {
    questionId: QuestionModel | null;
    answerId: AnswerModel | null;
  }[];
  className?: string;
}

const isValidAnswer = (answer: AnswerProps): boolean => {
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

  const getScore = (arr: AnswerProps[], section: string) =>
    arr
      .filter((ans) => ans.questionId?.section === section)
      .reduce((acc: number, answer) => acc + (answer.answerId?.points || 0), 0);

  const allScores = ranges.reduce((acc, range) => acc + getScore(answers, range.section), 0);
  const allMax = ranges.reduce((acc, range) => acc + range.thresholds[range.thresholds.length - 1].max, 0);

  return (
    <div className={`survey-result ${className}`}>
      <div className="survey-result__info">
        <div className="survey-result__details">
          <TheLink to={`/surveys/${survey._id}`} className="survey-result__title">
            {survey.title}
          </TheLink>
          <p className="survey-result__date">{createdAt}</p>
        </div>
        <Badge variant="small">
          {allScores} / {allMax}
        </Badge>
      </div>
      {ranges.map((section, index) => {
        const thresholds = section.thresholds;
        const max = thresholds[thresholds.length - 1].max;
        const score = getScore(answers, section.section);
        return (
          <div key={index} className="survey-result__section">
            <div className="survey-result__content">
              <p className="survey-result__section-name">
                Секция: <b>{section.section}</b>
              </p>
              <p className="survey-result__scores">
                {score} / {max}
              </p>
            </div>
            <Chart ranges={section.thresholds} value={score} />
          </div>
        );
      })}
    </div>
  );
};

export default SurveyResultCard;
