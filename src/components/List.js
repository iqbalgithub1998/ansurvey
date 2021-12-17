import React, { useState, useRef } from "react";
import { FcShare, FcMenu } from "react-icons/fc";
import { Popover, Overlay } from "react-bootstrap";

function List({
  id,
  title,
  date,
  status,
  response,
  openSurvey,
  Edit,
  Close,
  Delete,
  copyLink,
}) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const getDate = (date) => {
    let nd = new Date(date);
    return nd.getDate() + "/" + nd.getMonth() + "/" + nd.getFullYear();
  };
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <>
      <tr>
        <td>
          <span className="title">{title}</span>
          <br />
          <span>Created on {getDate(date)}</span>
        </td>
        <td>
          <div className="alignCenter">{status}</div>
        </td>
        <td>
          <div className="alignCenter response" onClick={() => openSurvey(id)}>
            {response}
          </div>
        </td>
        <td>
          <div className="alignCenter shareIcon">
            <FcShare onClick={copyLink} />
          </div>
        </td>
        <td>
          <div className="alignCenter" ref={ref}>
            <div>
              <FcMenu onClick={handleClick} />
              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                rootClose
                onHide={() => setShow(false)}
              >
                <Popover id="popover-contained">
                  <Popover.Header>
                    <div>
                      <div className="miniMenu" onClick={Edit}>
                        <strong>Edit</strong>
                      </div>
                      <div className="miniMenu" onClick={Close}>
                        <strong>
                          {status === "Running" ? "Close" : "Open"}
                        </strong>
                      </div>
                      <div className="miniMenu" onClick={Delete}>
                        <strong>Delete</strong>
                      </div>
                    </div>
                  </Popover.Header>
                </Popover>
              </Overlay>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default List;
