import React from "react";
import "./input.css"; // Importando o arquivo CSS

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="input"
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
