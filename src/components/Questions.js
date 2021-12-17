import React from "react";
import { Row, Col } from "react-bootstrap";
function Questions({ value, number, editQuestion }) {
  return (
    <div className="ListContainer">
      <Row style={{ height: "100%" }}>
        <Col
          xs={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>Q{number}</p>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <input
            value={value ? value : ""}
            autoFocus
            placeholder="Enter Your Question"
            className="question_input"
            onChange={(e) => editQuestion(e.target.value, number - 1)}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Questions;
