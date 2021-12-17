import React, { useState, useContext } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import loginImage from "../Images/casual-login.png";
import logo from "../Images/logo.png";
import InputField from "../components/InputField";
import "./login.css";
import fire from "../lib/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Toastmsg from "../components/Toastmsg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../lib/context";
import { setWithExpiry } from "../lib/localStorage";
function Login() {
  const authContext = useContext(AuthContext);
  const navigation = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "example2@gmail.com",
    password: "12345678",
  });
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    variant: "",
  });
  const onchange = (txt, type) => {
    let { email, password } = loginDetails;
    if (type === "email") {
      email = txt;
    } else {
      password = txt;
    }
    setLoginDetails({ email, password });
  };
  const login = () => {
    const details = { ...loginDetails };
    const auth = getAuth();
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log(user);
        authContext.setUser({ uid: user.uid, email: user.email });
        setWithExpiry("anSurveyUser", { uid: user.uid, email: user.email });
        navigation("/");
        // ... save the user ...
      })
      .catch((error) => {
        let mess = "Some Error occur";
        if (
          error.message === "Firebase: Error (auth/wrong-password)." ||
          error.message === "Firebase: Error (auth/user-not-found)."
        ) {
          mess = "Invalid Credentials";
        }
        setToast({
          message: error.message,
          variant: "Danger",
        });
        setShow(true);
      });
  };
  return (
    <div>
      <Row>
        <Col>
          <Link to="/">
            <Image style={{ marginTop: "10px" }} src={logo} />
          </Link>
        </Col>
      </Row>
      <Container>
        <Row>
          <Col className="column">
            <div className="mainContainer">
              <div>
                <Image className="loginImage" src={loginImage} />
              </div>
              <div className="loginForm">
                <h1>Login</h1>
                <br />
                <InputField
                  label="email"
                  value={loginDetails.email}
                  type="email"
                  onchange={onchange}
                />
                <InputField
                  label="password"
                  type="password"
                  value={loginDetails.password}
                  onchange={onchange}
                />
                <Toastmsg
                  show={show}
                  closeToast={() => setShow(false)}
                  message={toast.message}
                  variant={toast.variant}
                />
                <br />

                <Button variant="primary" size="lg" onClick={() => login()}>
                  Login
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
