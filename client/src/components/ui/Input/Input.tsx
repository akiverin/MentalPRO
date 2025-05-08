import React from 'react';
import classNames from 'classnames';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  value?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string | File | null) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, fullWidth = false, type = 'text', disabled = false, ...props }: InputProps, ref) => {
    const inputClasses = classNames(
      'input',
      { 'input--full-width': fullWidth },
      { 'input--disabled': disabled },
      className,
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'file') {
        const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
        onChange(file);
      } else {
        onChange(event.target.value);
      }
    };

    return (
      <input
        ref={ref}
        type={type}
        value={type !== 'file' ? value : undefined}
        onChange={handleChange}
        className={inputClasses}
        disabled={disabled}
        onFocus={(e) =>
          type === 'number' && e.target.addEventListener('wheel', (ev) => ev.preventDefault(), { passive: false })
        }
        {...props}
      />
    );
  },
);

export default Input;
