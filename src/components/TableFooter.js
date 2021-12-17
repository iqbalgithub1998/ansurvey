import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function TableFooter() {
  return (
    <div style={{ width: "100%", backgroundColor: "#EDEEEE", padding: "10px" }}>
      <Link to="/create">
        <Button style={{ width: "25%" }} variant="primary">
          +CREATE NEW SURVEY
        </Button>
      </Link>
    </div>
  );
}

export default TableFooter;
