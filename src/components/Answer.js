import React from "react";
import styled from "styled-components";
function Answer({ index, ans, date }) {
  return (
    <Div>
      <IndexDiv>
        <span style={{ fontSize: "20px" }}>{index}</span>
      </IndexDiv>
      <div>
        <div>
          <span style={{ fontSize: "24px" }}>{ans}</span>
        </div>
        <span style={{ fontSize: "12px" }}>{date}</span>
      </div>
    </Div>
  );
}

const Div = styled.div`
  width: 98%;
  height: 65px;
  display: flex;
  background-color: #ffffff;
  border-bottom: 2px solid #f5f5f5;
  margin-bottom: 2px;
  margin-left: 1%;
  margin-right: 1%;

  &:hover {
    background-color: #f4f5f5;
  }
`;
const IndexDiv = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Answer;
