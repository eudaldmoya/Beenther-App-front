import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  icon?: string;
  isCardButton: boolean;
}

const Button = ({
  text,
  icon,
  isCardButton,
}: ButtonProps): React.ReactElement => {
  return (
    <button className={`${isCardButton ? "button-card" : "button"}`}>
      {text}
      {icon && <img src={icon} alt={`${text} icon`} />}
    </button>
  );
};

export default Button;
