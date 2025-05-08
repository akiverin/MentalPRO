import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './TheCase.scss';
import Badge from '@/components/ui/Badge/Badge';
import CardCase from '@/components/CaseCard/CardCase';
import { practiceListStore } from '@/entities/practice/stores/practiceStoreInstance';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Error from '@/components/ui/Error';
import AccessControl from '@/components/AccessControl';
import TheLink from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import LoaderScreen from '@/components/ui/LoaderScreen';

const TheCase = observer(() => {
  const { link } = useParams<{ link: string }>();
  if (!link) {
    return <h2 className="case__not-found">ID практики не найден или передан не верно</h2>;
  }

  const navigate = useNavigate();

  useEffect(() => {
    practiceListStore.fetchPracticeById(link);
    practiceListStore.fetchPractices();
  }, [link]);

  const { practice: article, meta } = practiceListStore;

  const cases = practiceListStore.practices;

  const onDelete = () => {
    practiceListStore.delete(link);
    navigate('/cases');
  };

  if (meta === 'loading') {
    return <LoaderScreen />;
  }

  if (meta === 'error' || !article) {
    return (
      <section className="case">
        <div className="case__wrapper">
          <Error>Ошибка! Проверьте авторизованы ли вы и существует ли данная практика!</Error>
        </div>
      </section>
    );
  }

  const cleanHTML = DOMPurify.sanitize(article?.content);

  return (
    <>
      <section className="case">
        <div className="case__wrapper">
          <Badge className="case__badge" variant="small">
            {article.category}
          </Badge>
          <h1 className="case__title">{article.title}</h1>
          <div className="case__controls">
            <AccessControl requiredRoles={['admin']}>
              <TheLink to="edit" variant="rounded" background="secondary">
                Редактировать
              </TheLink>
              <Button onClick={onDelete} variant="rounded" background="danger">
                Удалить
              </Button>
            </AccessControl>
          </div>
          <img src={article.image} alt={article.title} className="case__image" />
          <div className="ql-snow">
            <div className="case__text ql-editor" dangerouslySetInnerHTML={{ __html: cleanHTML }} />
          </div>
        </div>
      </section>
      <section className="other-cases">
        <div className="other-cases__wrapper">
          <h2 className="other-cases__title">Другие практики</h2>
          <ul className="other-cases__list">
            {cases.slice(0, 4).map((cs) => (
              <li key={`case-${cs.id}`} className="other-cases_item">
                <CardCase
                  id={cs.id}
                  title={cs.title}
                  description={cs.description}
                  category={cs.category}
                  image={cs.image}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
});

export default TheCase;
