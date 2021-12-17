import React, { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import signupImage from "../Images/casual-register.png";
import logo from "../Images/logo.png";
import InputField from "../components/InputField";
import "./Register.css";
import Toastmsg from "../components/Toastmsg";
import fire from "../lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [registerDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [toast, setToast] = useState({
    message: "",
    variant: "",
  });
  const [show, setShow] = useState(false);
  const onchange = (value, type) => {
    const details = { ...registerDetails };
    if (type === "email") {
      details.email = value;
    } else if (type === "password") {
      details.password = value;
    } else {
      details.confirmPassword = value;
    }
    setRegisterDetails({ ...details });
  };

  const cleanInput = () => {
    setRegisterDetails({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const register = async () => {
    const details = { ...registerDetails };
    if (details.password === details.confirmPassword) {
      try {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, details.email, details.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            cleanInput();
            setToast({
              message: "Succesfully Registered..",
              variant: "Success",
            });
            setShow(true);
            navigate("/login");
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setToast({
              message: errorMessage,
              variant: "Danger",
            });
            setShow(true);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setToast({
        message: "Password and Confirm password are not matching!",
        variant: "Danger",
      });
      setShow(true);
    }
  };
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
              <div className="loginForm">
                <h1>Signup</h1>
                <br />
                <InputField
                  label="email"
                  value={registerDetails.email}
                  type="email"
                  onchange={onchange}
                />
                <InputField
                  value={registerDetails.password}
                  label="password"
                  type="password"
                  onchange={onchange}
                />
                <InputField
                  value={registerDetails.confirmPassword}
                  label="confirm password"
                  type="password"
                  onchange={onchange}
                />

                <Toastmsg
                  show={show}
                  closeToast={() => setShow(false)}
                  message={toast.message}
                  variant={toast.variant}
                />
                <br />
                <br />

                <Button variant="primary" size="lg" onClick={() => register()}>
                  Signup
                </Button>
              </div>
              <div>
                <Image className="loginImage" src={signupImage} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
