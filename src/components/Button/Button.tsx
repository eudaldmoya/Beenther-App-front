import React, { PropsWithChildren } from "react";
import "./Button.css";

interface ButtonProps extends PropsWithChildren {
  className: string;
  actionOnClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  actionOnClick,
  className,
  children,
  type,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      onClick={actionOnClick}
      type={type}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
