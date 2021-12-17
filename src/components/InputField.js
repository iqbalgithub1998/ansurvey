import React from "react";
import "./InputField.css";

function InputField({ value, label, type, onchange }) {
  return (
    <div className="inputContainer">
      <label>{label}</label>
      <input
        value={value ? value : ""}
        className="Input"
        type={type}
        onChange={(e) => onchange(e.target.value, label)}
      />
    </div>
  );
}

export default InputField;
