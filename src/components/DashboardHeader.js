import React, { useState, useRef } from "react";
import { Row, Col, Image, Popover, Overlay } from "react-bootstrap";
import logo from "../Images/DashLogo.png";
import { AiFillCaretDown } from "react-icons/ai";
import "./DashboardHeader.css";
function DashboardHeader({ userEmail, logout }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div>
      <Row>
        <Col>
          <div className="headerCont">
            <Image src={logo} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="userEmail">{userEmail}</span>
              <div ref={ref}>
                <AiFillCaretDown
                  onClick={handleClick}
                  color="#FFFFFF"
                  style={{ margin: "10px" }}
                />
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
                    <Popover.Header className="logout" as="h3" onClick={logout}>
                      Log out
                    </Popover.Header>
                  </Popover>
                </Overlay>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardHeader;
