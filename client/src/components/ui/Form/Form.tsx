import { FC, FormEvent, ReactNode } from "react";
import classNames from "classnames";
import "./Form.scss";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ onSubmit, children, className = "" }) => {
  return (
    <form className={classNames("form", className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { Form };
