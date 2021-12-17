import React from "react";
import InputField from "./InputField";
function QuestionInput({ value, index, question, onchange }) {
  return (
    <div>
      <p style={{ fontSize: "25px" }}>
        {index}. {question}
      </p>
      <InputField value={value} type="text" onchange={onchange} />
    </div>
  );
}
export default QuestionInput;
