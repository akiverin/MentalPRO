import React from 'react';
import classNames from 'classnames';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, fullWidth = false, type = 'text', disabled = false, ...props }: InputProps, ref) => {
    const inputClasses = classNames(
      'input',
      { 'input--full-width': fullWidth },
      { 'input--disabled': disabled },

      className,
    );
    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        className={inputClasses}
        onFocus={(e) =>
          type === 'number' &&
          e.target.addEventListener(
            'wheel',
            function (e) {
              e.preventDefault();
            },
            { passive: false },
          )
        }
        {...props}
      />
    );
  },
);

export default Input;
