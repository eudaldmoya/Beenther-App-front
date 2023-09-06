import React from "react";
import "./Button.css";
import { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  className: string;
  actionOnClick: () => void;
}

const Button = ({
  actionOnClick,
  className,
  children,
}: ButtonProps): React.ReactElement => {
  return (
    <button onClick={actionOnClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
