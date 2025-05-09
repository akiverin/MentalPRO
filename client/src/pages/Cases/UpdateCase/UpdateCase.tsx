import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import './UpdateCase.scss';

import { practiceListStore } from '@/entities/practice/stores/practiceStoreInstance';
import { PracticeFormStore } from '@/entities/practice/stores/PracticeFormStore';

import { Form } from '@/components/ui/Form';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Error from '@/components/ui/Error';
import LoaderScreen from '@/components/ui/LoaderScreen';
import Editor from '@/components/ui/Editor';
import Quill from 'quill';

const UpdateCase: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const form = useState(() => new PracticeFormStore())[0];
  const editorRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      await practiceListStore.fetchPracticeById(id);
      const data = practiceListStore.practice;
      if (data) {
        form.setField('title', data.title);
        form.setField('description', data.description);
        form.setField('category', data.category);
        form.setField('image', '');
        form.setField('content', data.content);
      }
    })();
  }, [id, form]);

  useEffect(() => {
    if (form.content && editorRef.current) {
      editorRef.current.clipboard.dangerouslyPasteHTML(form.content);
    }
  }, [form.content]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll()) return;

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('content', form.content);
    formData.append('category', form.category);

    if (form.image instanceof File) {
      formData.append('practiceCover', form.image);
    }

    const success = await practiceListStore.update(id!, formData);
    if (success) {
      navigate(`/practices/${id}`);
    }
  };

  if (practiceListStore.meta === 'loading') {
    return <LoaderScreen />;
  }

  return (
    <section className="case-update">
      <h1 className="case-update__title">Редактирование практики</h1>

      <Form onSubmit={onSubmit} className="case-update__form">
        <div className="case-update__field">
          <label>Заголовок</label>
          <Input
            placeholder="Введите заголовок"
            value={form.title}
            onChange={(v) => form.setField('title', typeof v === 'string' ? v : '')}
            fullWidth
          />
          {form.errors.title && <Error>{form.errors.title}</Error>}
        </div>

        <div className="case-update__field">
          <label>Краткое описание</label>
          <TextArea
            placeholder="Краткое описание"
            value={form.description}
            onChange={(v) => form.setField('description', v)}
            fullWidth
          />
          {form.errors.description && <Error>{form.errors.description}</Error>}
        </div>

        <div className="case-update__field">
          <label>Категория</label>
          <Input
            placeholder="Категория"
            value={form.category}
            onChange={(v) => form.setField('category', typeof v === 'string' ? v : '')}
            fullWidth
          />
          {form.errors.category && <Error>{form.errors.category}</Error>}
        </div>

        <div className="case-update__field">
          <label>Содержимое</label>
          <Editor
            ref={editorRef}
            onChange={(content: string) => form.setField('content', content)}
            defaultValue={form.content}
            placeholder="Введите новое содержимое практики..."
          />
          {form.errors.content && <Error>{form.errors.content}</Error>}
        </div>

        {form.image && typeof form.image === 'string' && (
          <div className="case-update__preview">
            <label>Текущая обложка</label>
            <img src={form.image} alt="Cover preview" className="case-update__preview-img" />
          </div>
        )}

        <div className="case-update__field">
          <label>Загрузить новую обложку</label>
          <Input type="file" onChange={(v) => form.setField('image', v)} fullWidth />
          {form.errors.image && <Error>{form.errors.image}</Error>}
        </div>

        <Button type="submit" size="large">
          Сохранить изменения
        </Button>
      </Form>
    </section>
  );
});

export default UpdateCase;
