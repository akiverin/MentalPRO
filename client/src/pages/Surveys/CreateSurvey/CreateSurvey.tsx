import { useEffect } from 'react';
import './CreateSurvey.scss';

import { observer, useLocalObservable } from 'mobx-react-lite';
import { surveyListStore } from '@entities/survey/stores/surveyStoreInstance';
import { SurveyFormStore } from '@/entities/survey/stores/SurveyFormStore';

import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import QuestionBuilder from './QuestionBuilder';
import { QuestionFormStore } from '@/entities/question/stores/QuestionFormStore';
import { toJS } from 'mobx';
import { QuestionStore } from '@/entities/question/stores/QuestionStore';

const CreateSurvey = observer(() => {
  const form = useLocalObservable(() => new SurveyFormStore());
  const questionForm = useLocalObservable(() => new QuestionFormStore());
  const questionStore = useLocalObservable(() => new QuestionStore());

  useEffect(() => {
    surveyListStore.fetchSurveys();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) return;

    const questions = [];
    console.log(toJS(form.ranges));
    console.log(toJS(questionForm.questions));

    for (const question of questionForm.questions) {
      const answersToSend = question.answerStore.answers.map((answer) => ({
        number: Number(answer.number),
        text: answer.text,
        points: Number(answer.points),
      }));

      const savedQuestion = await questionStore.create({
        number: Number(question.number),
        text: question.text,
        section: question.section,
        answers: answersToSend,
      });

      questions.push(savedQuestion?._id);
    }

    console.log('Сохраненные вопросы:', questions);

    surveyListStore.create({
      title: form.title,
      description: form.description,
      image: form.image,
      time: Number(form.time),
      ranges: toJS(form.ranges),
      details: form.details,
      results: form.results,
      questions: questions,
    });
  };

  return (
    <>
      <section className="survey-create-info">
        <div className="survey-create-info__wrapper">
          <div className="survey-create-info__titles">
            <h1 className="survey-create-info__title">Создание опроса</h1>
            <p className="survey-create-info__subtitle">Форма для создания опросов.</p>
          </div>
        </div>
      </section>

      <section className="survey-create">
        <div className="survey-create__wrapper">
          <Form onSubmit={onSubmit} className="survey-create__form">
            <div className="survey-create__field">
              <p className="survey-create__label">Заголовок опроса</p>
              <Input
                placeholder="Добавьте название опроса"
                value={form.title}
                onChange={(value) => form.setField('title', value)}
                fullWidth
              />
              {form.errors.title && <Error className="survey-create__error">{form.errors.title}</Error>}
            </div>
            <div className="survey-create__field">
              <p className="survey-create__label">Описание опроса</p>
              <TextArea
                placeholder="Добавьте описание методологии опроса"
                value={form.description}
                onChange={(value) => form.setField('description', value)}
                fullWidth
              />
              {form.errors.description && <Error className="survey-create__error">{form.errors.description}</Error>}
            </div>
            <div className="survey-create__field">
              <p className="survey-create__label">Дополнительные детали</p>
              <TextArea
                placeholder="Добавьте дополнительную информацию об опросе (плюсы, минусы, автор методолгии, ...)"
                value={form.details}
                onChange={(value) => form.setField('details', value)}
                fullWidth
              />
              {form.errors.details && <Error className="survey-create__error">{form.errors.details}</Error>}
            </div>
            <div className="survey-create__field">
              <p className="survey-create__label">Получаемые результаты</p>
              <TextArea
                placeholder="Добавьте описание полученных результатов)"
                value={form.results}
                onChange={(value) => form.setField('results', value)}
                fullWidth
              />
              {form.errors.results && <Error className="survey-create__error">{form.errors.results}</Error>}
            </div>
            <div className="survey-create__field">
              <p className="survey-create__label">Время прохождения (минуты)</p>
              <Input
                type="number"
                placeholder="Время прохождения опроса"
                value={form.time}
                onChange={(value) => form.setField('time', value)}
                fullWidth
              />

              {form.errors.time && <Error>{form.errors.time}</Error>}
            </div>
            {/* Image URL */}
            <div className="survey-create__field">
              <p className="survey-create__label">URL изображения</p>
              <Input
                placeholder="Добавь ссылку на изображение"
                value={form.image}
                onChange={(value) => form.setField('image', value)}
                fullWidth
              />
              {form.errors.image && <Error>{form.errors.image}</Error>}
            </div>

            <div className="survey-create__field">
              <p className="survey-create__label">Диапазоны секций</p>
              {form.ranges.map((sec, si) => (
                <div key={si} className="survey-create__section">
                  <div className="survey-create__section-header">
                    <Input
                      fullWidth
                      placeholder="Название секции"
                      value={sec.section}
                      onChange={(val) => form.setSection(si, val)}
                    />
                    <Button
                      background="light"
                      variant="rounded"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        form.removeSection(si);
                      }}
                    >
                      Удалить секцию
                    </Button>
                  </div>
                  {form.errors.ranges[si]?.section && (
                    <Error className="survey-create__error">{form.errors.ranges[si].section}</Error>
                  )}

                  {sec.thresholds.map((t, ti) => (
                    <div key={ti} className="survey-create__threshold">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={t.min.toString()}
                        style={{ maxWidth: '140px' }}
                        onChange={(val) => form.setThresholdField(si, ti, 'min', val === '' ? '' : Number(val))}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={t.max.toString()}
                        style={{ maxWidth: '140px' }}
                        onChange={(val) => form.setThresholdField(si, ti, 'max', val === '' ? '' : Number(val))}
                      />
                      <Input
                        placeholder="Название порога"
                        value={t.title}
                        onChange={(val) => form.setThresholdField(si, ti, 'title', val)}
                      />
                      <Input
                        placeholder="Цвет (#HEX)"
                        value={t.color}
                        style={{ maxWidth: '200px' }}
                        onChange={(val) => form.setThresholdField(si, ti, 'color', val)}
                      />
                      <Button
                        background="light"
                        variant="rounded"
                        size="small"
                        onClick={(e) => {
                          e.preventDefault();
                          form.removeThreshold(si, ti);
                        }}
                      >
                        Удалить порог
                      </Button>
                      <div className="survey-create__threshold-errors">
                        {form.errors.ranges[si]?.thresholds[ti]?.min && (
                          <Error className="survey-create__error">{form.errors.ranges[si].thresholds[ti].min}</Error>
                        )}
                        {form.errors.ranges[si]?.thresholds[ti]?.max && (
                          <Error className="survey-create__error">{form.errors.ranges[si].thresholds[ti].max}</Error>
                        )}
                        {form.errors.ranges[si]?.thresholds[ti]?.title && (
                          <Error className="survey-create__error">{form.errors.ranges[si].thresholds[ti].title}</Error>
                        )}
                        {form.errors.ranges[si]?.thresholds[ti]?.color && (
                          <Error className="survey-create__error">{form.errors.ranges[si].thresholds[ti].color}</Error>
                        )}
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="rounded"
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      form.addThreshold(si);
                    }}
                  >
                    Добавить порог
                  </Button>
                </div>
              ))}
              <Button
                variant="rounded"
                onClick={(e) => {
                  e.preventDefault();
                  form.addSection();
                }}
              >
                Добавить секцию
              </Button>
            </div>
            <QuestionBuilder store={questionForm} />
            <Button size="large" type="submit">
              Сохранить опрос
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
});

export default CreateSurvey;
