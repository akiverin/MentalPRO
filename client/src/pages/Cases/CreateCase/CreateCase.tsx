import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { PracticeFormStore } from '@/entities/practice/stores/PracticeFormStore';
import { practiceListStore } from '@/entities/practice/stores/practiceStoreInstance';
import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';

import './CreateCase.scss';
import { useNavigate } from 'react-router-dom';
import Editor from '@/components/ui/Editor';
import LoaderScreen from '@/components/ui/LoaderScreen';

const CreateCase: React.FC = observer(() => {
  const navigate = useNavigate();
  const form = useLocalObservable(() => new PracticeFormStore());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) return;

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('category', form.category);
    fd.append('content', form.content);
    if (form.image instanceof File) {
      fd.append('practiceCover', form.image);
    }

    const ok = await practiceListStore.create(fd);
    if (ok?.success) {
      navigate(`/cases/`);
    }
  };

  if (practiceListStore.meta === 'loading') {
    return <LoaderScreen />;
  }

  return (
    <section className="case-create">
      <div className="case-create__wrapper">
        <h1 className="case-create__title">Новая практика</h1>
        <Form onSubmit={onSubmit} className="case-create__form">
          <div className="case-create__field">
            <label className="case-create__label">Заголовок</label>
            <Input
              placeholder="Название метода"
              value={form.title}
              onChange={(v) => form.setField('title', typeof v === 'string' ? v : '')}
              fullWidth
            />
            {form.errors.title && <Error>{form.errors.title}</Error>}
          </div>

          <div className="case-create__field">
            <label className="case-create__label">Описание</label>
            <TextArea
              placeholder="Краткое описание"
              value={form.description}
              onChange={(v) => form.setField('description', v)}
              fullWidth
            />
            {form.errors.description && <Error>{form.errors.description}</Error>}
          </div>

          <div className="case-create__field">
            <label className="case-create__label">Категория</label>
            <Input
              placeholder="Категория"
              value={form.category}
              onChange={(v) => form.setField('category', typeof v === 'string' ? v : '')}
              fullWidth
            />
            {form.errors.category && <Error>{form.errors.category}</Error>}
          </div>

          <div className="case-create__field">
            <label className="case-create__label">Содержимое</label>
            <Editor
              onChange={(content: string) => form.setField('content', content)}
              defaultValue={form.content}
              placeholder="Введите содержимое практики..."
            />
            {form.errors.content && <Error>{form.errors.content}</Error>}
          </div>

          <div className="case-create__field">
            <label className="case-create__label">Изображение</label>
            <Input
              className="case-create__input-file"
              type="file"
              placeholder="Добавь изображение"
              onChange={(value) => form.setField('image', value)}
              fullWidth
            />
            {form.errors.image && <Error>{form.errors.image}</Error>}
          </div>

          <Button type="submit" size="large">
            Сохранить практику
          </Button>
        </Form>
      </div>
    </section>
  );
});

export default CreateCase;
