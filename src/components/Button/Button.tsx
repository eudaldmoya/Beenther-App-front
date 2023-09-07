import React, { PropsWithChildren } from "react";
import "./Button.css";

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
