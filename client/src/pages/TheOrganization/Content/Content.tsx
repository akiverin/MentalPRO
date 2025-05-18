import React from 'react';
import './Content.scss';
import { observer } from 'mobx-react-lite';
import SurveyResultCard from '@/pages/auth/Profile/SurveyResultCard/SurveyResultCard';
import { Meta } from '@/utils/meta';
import { ResultModel } from '@/entities/result/model';
import ComplexResultCard from './SurveyResultCard';
import { QuestionModel } from '@/entities/question/model';
import { AnswerModel } from '@/entities/answer/model';

interface ContentProps {
  results: ResultModel[] | null;
  meta: Meta;
}

const Content: React.FC<ContentProps> = observer(({ results, meta }) => {
  function groupAnswersBySurveyId(results: ResultModel[] | null) {
    if (!results || results.length === 0) {
      return [];
    }

    const surveyMap = new Map<
      string,
      {
        survey: ResultModel['surveyId'];
        allAnswers: {
          questionId: QuestionModel | null;
          answerId: AnswerModel | null;
        }[];
        count: number;
      }
    >();

    results.forEach((result) => {
      const surveyIdKey = result.surveyId._id.toString();

      if (!surveyMap.has(surveyIdKey)) {
        surveyMap.set(surveyIdKey, {
          survey: result.surveyId,
          count: 0,
          allAnswers: [],
        });
      }

      const surveyData = surveyMap.get(surveyIdKey)!;
      surveyData.allAnswers.push(...result.answers);
      surveyData.count++;
    });

    return Array.from(surveyMap.values());
  }

  const complexResults = groupAnswersBySurveyId(results);
  console.log('res', results);

  return (
    <div className="organization-content">
      <h2 className="organization-content__title">Смежные результаты (сводка)</h2>
      {complexResults.length ? (
        <ul className="profile__history-list">
          {complexResults.map((cr) => (
            <li key={cr.survey._id} className="profile__history-item">
              <ComplexResultCard survey={cr.survey} allAnswers={cr.allAnswers} count={cr.count} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="organization-content__empty">Нет агрегированных данных</p>
      )}
      {meta === 'error' && <p className="profile__error">Данные не были загружены</p>}
      <h2 className="organization-content__title">Результаты участников организации</h2>
      {results && (
        <ul className="profile__history-list">
          {results.map((res) => (
            <li key={res._id} className="profile__history-item">
              <SurveyResultCard
                survey={res.surveyId}
                createdAt={res.createdAt}
                answers={res.answers}
                author={res.userId}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default Content;
