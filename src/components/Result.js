import React from "react";
import Answer from "./Answer";
import styled from "styled-components";
function Result({ ind, question, response }) {
  const getDate = (index) => {
    const date = new Date(response[index].data);
    //console.log(date);
    return (
      date.getDay() +
      "/" +
      (parseInt(date.getMonth()) + 1) +
      "/" +
      date.getFullYear() +
      " - " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };
  return (
    <div className="resultContainer">
      <div>
        <div>
          <span style={{ margin: "20px", fontSize: "25px" }}>Q{ind + 1}</span>
        </div>
        <div>
          <span>
            <h3 style={{ marginLeft: "20px", marginTop: "5px" }}>{question}</h3>
          </span>
        </div>
        <div>
          <span style={{ marginLeft: "20px" }}>Answered:{response.length}</span>
        </div>
        {response.length > 0 ? (
          <Div>
            {response.map((ans, index) => {
              return (
                <Answer
                  key={index}
                  index={index + 1}
                  ans={ans.answer[ind]}
                  date={getDate(index)}
                />
              );
            })}
          </Div>
        ) : (
          <EmptyDiv>
            <h1>No response found.</h1>
          </EmptyDiv>
        )}
      </div>
    </div>
  );
}
const Div = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  width: 100%;
`;
const EmptyDiv = styled.div`
  width: 98%;
  height: 100px;
  background-color: #ffffff;
  display: grid;
  place-items: center;
  margin-left: 1%;
  margin-right: 1%;
`;

export default Result;
