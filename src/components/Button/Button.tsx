import React, { PropsWithChildren } from "react";
import "./Button.css";

interface ButtonProps
  extends PropsWithChildren,
    Partial<Omit<HTMLButtonElement, "children">> {
  actionOnClick?: () => void;
}

const Button = ({
  actionOnClick,
  className,
  children,
  type,
  disabled,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      disabled={disabled}
      onClick={actionOnClick}
      type={type}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
