import React from "react";
import Result from "./Result";

function SurveyDetails({ title, questions, responses }) {
  return (
    <div className="detailsContainer">
      <h1 className="headerTitle">{title ? title : ""}</h1>
      <div
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "79vh",
          overflowY: "scroll",
        }}
      >
        {questions.length > 0 ? (
          <>
            {questions.map((q, i) => (
              <Result key={i} ind={i} question={q} response={responses} />
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SurveyDetails;
