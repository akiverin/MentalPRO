import { observer } from 'mobx-react-lite';
import { IQuestionForm, QuestionFormStore } from '@entities/question/stores/QuestionFormStore';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import './QuestionBuilder.scss';

interface Props {
  store: QuestionFormStore;
}

const QuestionBuilder = observer(({ store }: Props) => {
  const createDuplicate = async (e: React.FormEvent, q: IQuestionForm, qi: number) => {
    e.preventDefault();
    const newIndex = qi + 1;

    // Копируем основные поля вопроса
    store.setField(newIndex, 'number', q.number === '' ? '' : Number(q.number));
    store.setField(newIndex, 'section', q.section);
    store.setField(newIndex, 'text', q.text); // Исправлено с 'number' на 'text'

    q.answerStore.answers.forEach((answer, index) => {
      if (index > 0) {
        store.questions[newIndex].answerStore.addAnswer();
      }

      store.questions[newIndex].answerStore.setField(
        index,
        'number',
        answer.number === '' ? '' : Number(answer.number),
      );
      store.questions[newIndex].answerStore.setField(index, 'text', answer.text);
      store.questions[newIndex].answerStore.setField(
        index,
        'points',
        answer.points === '' ? '' : Number(answer.points),
      );
    });
  };

  return (
    <div className="question-builder">
      {store.questions.map((q, qi) => (
        <div key={qi} className="question-builder__field">
          <p className="question-builder__title">Вопрос {qi + 1}</p>
          <div className="question-builder__question">
            <div className="question-builder__question-head">
              <Input
                placeholder="№ вопроса"
                type="number"
                value={q.number.toString()}
                style={{ maxWidth: '200px', width: '100%' }}
                onChange={(val) => store.setField(qi, 'number', val === '' ? '' : Number(val))}
              />
              {store.errors[qi]?.number && <Error>{store.errors[qi].number}</Error>}
              <Input
                fullWidth
                placeholder="Секция"
                value={q.section}
                style={{ minWidth: '200px' }}
                onChange={(val) => store.setField(qi, 'section', typeof val === 'string' ? val : '')}
              />
              {store.errors[qi]?.section && <Error>{store.errors[qi].section}</Error>}
            </div>
            <Input
              fullWidth
              placeholder="Текст вопроса"
              value={q.text}
              onChange={(val) => store.setField(qi, 'text', typeof val === 'string' ? val : '')}
            />
            {store.errors[qi]?.text && <Error>{store.errors[qi].text}</Error>}
          </div>

          <div className="question-builder__answers-list">
            <p className="question-builder__title">Ответы</p>
            {q.answerStore.answers.map((ans, ai) => (
              <div key={ai} className="question-builder__answer">
                <Input
                  placeholder="№ ответа"
                  type="number"
                  value={ans.number.toString()}
                  style={{ maxWidth: '140px' }}
                  onChange={(val) => q.answerStore.setField(ai, 'number', val === '' ? '' : Number(val))}
                />
                {q.answerStore.errors[ai]?.[0].number && <Error>{q.answerStore.errors[ai][0].number}</Error>}
                <Input
                  placeholder="Текст ответа"
                  value={ans.text}
                  onChange={(val) => q.answerStore.setField(ai, 'text', typeof val === 'string' ? val : '')}
                />
                {q.answerStore.errors[ai]?.[0].text && <Error>{q.answerStore.errors[ai][0].text}</Error>}
                <Input
                  placeholder="Баллы"
                  type="number"
                  value={ans.points.toString()}
                  style={{ maxWidth: '200px' }}
                  onChange={(val) => q.answerStore.setField(ai, 'points', val === '' ? '' : Number(val))}
                />
                {q.answerStore.errors[ai]?.[0].points && <Error>{q.answerStore.errors[ai][0].points}</Error>}
                <Button
                  variant="rounded"
                  background="danger"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    q.answerStore.removeAnswer(ai);
                  }}
                >
                  Удалить ответ
                </Button>
              </div>
            ))}

            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault();
                q.answerStore.addAnswer();
              }}
            >
              Добавить ответ
            </Button>
          </div>
          <div className="question-builder__actions">
            <Button size="small" variant="rounded" background="light" onClick={() => store.removeQuestion(qi)}>
              Удалить вопрос
            </Button>
            <Button
              disabled={store.questions[0] == q}
              background="light"
              size="small"
              onClick={(event) => createDuplicate(event, store.questions[qi - 1], qi - 1)}
            >
              Скопировать предыдущий вопрос
            </Button>
          </div>
        </div>
      ))}

      <Button
        background="success"
        variant="rounded"
        onClick={(e) => {
          e.preventDefault();
          store.addQuestion();
        }}
      >
        Добавить вопрос
      </Button>
    </div>
  );
});

export default QuestionBuilder;
