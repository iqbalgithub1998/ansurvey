import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import hompageImage from "../Images/casual-homeScreen.png";
import logo from "../Images/logo.png";
import "./Homepage.css";
import { Link } from "react-router-dom";
function Homepage() {
  return (
    <div>
      <Row>
        <Col>
          <Link to="/">
            <Image
              style={{ marginTop: "10px", marginLeft: "40px" }}
              src={logo}
            />
          </Link>
        </Col>
      </Row>

      <Container>
        <Row>
          <Col className="column">
            <div className="mainContainer">
              <div className="leftCont">
                <div>
                  <div>
                    <h1 className="headerTxt">
                      Create Your own <br /> Anonymous Servey
                    </h1>
                    <p className="lightTxt">
                      You can create your anonymous servey
                      <br /> for free
                    </p>
                  </div>
                  <div>
                    <Link to="/login">
                      <Button className="buttons" variant="primary">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="buttons" variant="outline-primary">
                        Signup
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <Image className="HomepageImage" src={hompageImage} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
