import React from "react";
import "./button.css"; // Importando o arquivo CSS

const Button = ({ Text, onClick, Type = "button" }) => {
  return (
    <button type={Type} className="button" onClick={onClick}>
      {Text}
    </button>
  );
};

export default Button;
