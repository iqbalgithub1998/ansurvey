import React from "react";
import { Table } from "react-bootstrap";
import "./ListTable.css";

import TableFooter from "../components/TableFooter";
import List from "./List";
function ListTable({ list, openSurvey, Edit, Close, Delete, copyLink }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          maxHeight: "58vh",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Table bordered hover variant="dark">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>STATUS</th>
              <th>RESPONSES</th>
              <th>SHARE</th>
              <th>MORE</th>
            </tr>
          </thead>
          <tbody>
            {list.length !== 0 ? (
              <>
                {list.map((data, index) => (
                  <List
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    date={data.date}
                    status={data.status}
                    response={data.responses.length}
                    openSurvey={openSurvey}
                    Edit={() => Edit(data)}
                    Close={() => Close(data, index)}
                    Delete={() => Delete(data.id, index)}
                    copyLink={() => copyLink(data.id)}
                  />
                ))}
              </>
            ) : (
              <tr className="noListMessage">
                <p style={{ backgroundColor: "#EDEEEE" }}>Get Started,</p>
                <p style={{ backgroundColor: "#EDEEEE" }}>
                  <strong>Create Your new Survey</strong>
                </p>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <TableFooter />
    </>
  );
}

export default ListTable;
