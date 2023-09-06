import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  icon?: string;
  isCardButton: boolean;
  isActive: boolean;
  actionOnClick: () => void;
}

const Button = ({
  text,
  icon,
  isCardButton,
  isActive,
  actionOnClick,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={`${isCardButton ? "button button-card" : "button"} ${
        isActive ? "active" : "inactive"
      }`}
      onClick={actionOnClick}
    >
      {text}
      {icon && <img src={icon} alt={`${text} icon`} />}
    </button>
  );
};

export default Button;
