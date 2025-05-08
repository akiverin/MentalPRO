import Quill, { Delta, EmitterSource, Range } from 'quill';
import 'quill/dist/quill.snow.css';
import { forwardRef, useRef, useEffect, useLayoutEffect, useImperativeHandle } from 'react';
import './Editor.scss';

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (content: string, delta: Delta, source: EmitterSource) => void;
  onSelectionChange?: (range: Range, oldRange: Range, source: string) => void;
}

const Editor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly = false, defaultValue, onChange, placeholder, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const editorInstance = useRef<Quill | null>(null);

    useLayoutEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorElement = document.createElement('div');
      container.appendChild(editorElement);
      const quill = new Quill(editorElement, {
        theme: 'snow',
        readOnly,
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      });

      editorInstance.current = quill;
      if (defaultValue) {
        quill.clipboard.dangerouslyPasteHTML(defaultValue);
      }

      quill.on('text-change', (delta, _, source) => {
        onChange?.(quill.root.innerHTML, delta, source);
      });

      quill.on('selection-change', (range, oldRange, source) => {
        onSelectionChange?.(range, oldRange, source);
      });

      return () => {
        quill.off('text-change');
        quill.off('selection-change');
        container.innerHTML = '';
      };
    }, []);

    useEffect(() => {
      editorInstance.current?.enable(!readOnly);
    }, [readOnly]);

    useImperativeHandle(ref, () => editorInstance.current as Quill);

    return <div ref={containerRef} style={{ minHeight: 250 }} />;
  },
);

export default Editor;
