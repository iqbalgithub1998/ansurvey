import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ImArrowLeft2 } from "react-icons/im";
import Questions from "../components/Questions";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CreateSurvey.css";
import Toastmsg from "../components/Toastmsg";
import AuthContext from "../lib/context";
import fire from "../lib/firebase";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
function CreateSurvey() {
  const { id } = useParams();
  const db = getFirestore();
  useEffect(() => {
    if (id) {
      loadData();
    }
  }, []);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [property, setProperty] = useState({
    message: "",
    variant: "",
  });
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

  // for edit load data from server .........
  const loadData = async () => {
    const docRef = doc(db, "survey", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setTitle(data.title);
      setQuestions([...data.questions]);
      setEdit(true);
      setEditData({ ...data });
    } else {
      setProperty({
        message: "No such survey found!",
        variant: "danger",
      });
      setShow(true);
    }
  };

  const edittitle = (value) => {
    setTitle(value);
  };

  const editQuestion = (value, index) => {
    if (index === 0) {
      const q = [];
      q.push(value);
      setQuestions([...q]);
    } else {
      const q = [...questions];
      q[index] = value;
      setQuestions([...q]);
    }
  };
  const addQuestion = () => {
    const q = [...questions];
    q.push("");
    setQuestions([...q]);
  };

  const submitSurvey = async () => {
    if (title === "" || questions.length === 0) {
      setProperty({
        message: "fill all the field",
        variant: "danger",
      });
      setShow(true);
      return null;
    }
    const q = [];
    questions.map((ques) => {
      if (ques.length !== 0) {
        q.push(ques);
      }
    });
    if (edit === false) {
      const finalSurvey = {
        title: title,
        status: "Running",
        user: user.uid,
        date: Date.now(),
        questions: [...q],
        responses: [],
      };
      try {
        const docRef = await addDoc(collection(db, "survey"), {
          ...finalSurvey,
        });
        //console.log("Document written with ID: ", docRef.id);
        navigate(-1);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      const finalUpdateSurvey = {
        ...editData,
        title: title,
        questions: [...q],
      };
      const washingtonRef = doc(db, "survey", id);

      // Set the "capital" field of the city 'DC'
      try {
        await updateDoc(washingtonRef, { ...finalUpdateSurvey });
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div
        style={{
          margin: "20px",
          marginLeft: "40px",
          overflow: "auto",
          overflowX: "scroll",
          display: "table",
        }}
      >
        <Row>
          <Col>
            <Link to="/">
              <ImArrowLeft2 style={{ width: "30px", height: "30px" }} />
            </Link>
          </Col>
        </Row>
      </div>
      <div
        style={{
          marginLeft: "150px",
          marginRight: "150px",
        }}
      >
        <input
          className="titleInput"
          placeholder="Enter your Title"
          value={title}
          onChange={(e) => edittitle(e.target.value)}
        />
        <Toastmsg
          show={show}
          closeToast={() => setShow(false)}
          message={property.message}
          variant={property.variant}
        />
        <br />
        <div
          style={{
            width: "100%",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <div className="mainCont">
              <div style={{ width: "100%", height: "100%" }}>
                {questions.length > 0 ? (
                  <div
                    className="mostly-customized-scrollbar"
                    style={{
                      width: "100%",
                      maxHeight: "58vh",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {questions.map((que, i) => (
                      <Questions
                        key={i}
                        value={que}
                        number={i + 1}
                        editQuestion={editQuestion}
                      />
                    ))}
                  </div>
                ) : (
                  <Questions
                    number={questions.length + 1}
                    editQuestion={editQuestion}
                  />
                )}
              </div>
              <div className="nextQuestion">
                <Button
                  variant="primary"
                  size="md"
                  className="addButton"
                  onClick={addQuestion}
                >
                  NEXT QUESTION
                </Button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div
          className="addButton"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={submitSurvey}
            variant="outline-primary"
            style={{ marginLeft: "40%", marginRight: "40%", padding: "15px" }}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateSurvey;
