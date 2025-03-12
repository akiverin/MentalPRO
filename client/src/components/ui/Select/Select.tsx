import { FC, SelectHTMLAttributes, useMemo } from "react";
import classNames from "classnames";
import "./Select.scss";

interface OptionProps {
  label: string;
  value: number | string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  defaultValue?: string | number;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  options: OptionProps[];
  onChange?: (selectedOption: OptionProps) => void;
}

const Select: FC<SelectProps> = ({
  defaultValue,
  placeholder,
  fullWidth = false,
  disabled = false,
  className = "",
  options = [],
  onChange,
  ...rest
}) => {
  const selectClasses = classNames(
    "select",
    {
      "select--full-width": fullWidth,
      "select--disabled": disabled,
    },
    className
  );

  const currentOptions = useMemo(() => {
    const opts = [...options];
    if (placeholder) {
      opts.unshift({ label: placeholder, value: "" });
    }
    return opts;
  }, [options, placeholder]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const selectedValue = e.target.value;
      const selectedOption = options.find(
        (option) => option.value.toString() === selectedValue
      );

      if (selectedOption) {
        onChange(selectedOption);
      }
    }
  };

  return (
    <div className="select-container">
      <select
        className={selectClasses}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      >
        {currentOptions.map((option) => (
          <option key={`${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="select-arrow">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 16L12 21L17 16"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M17 8L12 3L7 8"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </span>
    </div>
  );
};

export default Select;
