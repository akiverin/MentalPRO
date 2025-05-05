import React from 'react';
import classNames from 'classnames';
import './TextArea.scss';

export type TextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> & {
  value: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, onChange, className, fullWidth = false, disabled = false, ...props }: TextAreaProps, ref) => {
    const inputClasses = classNames(
      'text-area',
      { 'text-area--full-width': fullWidth },
      { 'text-area--disabled': disabled },

      className,
    );
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        className={inputClasses}
        {...props}
      ></textarea>
    );
  },
);

export default TextArea;
