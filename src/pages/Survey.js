import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import QuestionInput from "../components/QuestionInput";
import { Button } from "react-bootstrap";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import Toastmsg from "../components/Toastmsg";
import { setWithExpiry, getWithExpiry } from "../lib/localStorage";
function Survey() {
  const db = getFirestore();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [property, setProperty] = useState({
    message: "",
  });
  const [show, setShow] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [survey, setSurvey] = useState(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState({
    message: "",
    flag: false,
  });
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const docRef = doc(db, "survey", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      //console.log(data);
      const saveData = getWithExpiry("anSurveyComplatedTask");
      if (saveData != null) {
        const index = saveData.indexOf(id);
        if (data.status === "Closed" || index !== -1) {
          const error = {
            message:
              index !== -1
                ? "You have already submit the response."
                : "Survey is Closed",
            flag: true,
          };
          setError({ ...error });
        } else {
          setTitle(data.title);
          setQuestions([...data.questions]);
          setSurvey({ ...data });
        }
      } else {
        setTitle(data.title);
        setQuestions([...data.questions]);
        setSurvey({ ...data });
      }
    } else {
      const error = {
        message: "No Survey Found or Survey is Closed.",
        flag: true,
      };
      setError({ ...error });
    }
  };

  const onchange = (value, index) => {
    const arr = [...responses];
    arr[index] = value;
    setResponses([...arr]);
  };

  const submitSurvey = async () => {
    const res = {
      data: Date.now(),
      answer: [...responses],
    };
    const resArray = [...survey.responses];
    resArray.push(res);
    const submitSurvey = {
      ...survey,
      responses: [...resArray],
    };
    //console.log(submitSurvey);
    const washingtonRef = doc(db, "survey", id);

    try {
      await updateDoc(washingtonRef, { ...submitSurvey });
      const saveData = getWithExpiry("anSurveyComplatedTask");
      if (saveData == null) {
        const dataArray = [];
        dataArray.push(id);
        setWithExpiry("anSurveyComplatedTask", dataArray);
      } else {
        saveData.push(id);
        setWithExpiry("anSurveyComplatedTask", saveData);
      }
      const error = {
        message: "Congratulation, Your response is recorded.",
        flag: true,
      };
      setError({ ...error });
    } catch (error) {
      console.log(error);
    }
    setResponses([]);
  };
  return (
    <div>
      {error.flag === false ? (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <H1>{title}</H1>
            <Toastmsg
              show={show}
              time={100000}
              closeToast={() => setShow(false)}
              message={property.message}
              variant="danger"
            />
          </div>
          <Div>
            {questions.length !== 0 ? (
              <div>
                {questions.map((q, index) => (
                  <QuestionInput
                    value={responses[index]}
                    key={index}
                    index={index + 1}
                    question={q}
                    onchange={(value, label) => onchange(value, index)}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </Div>
          <div
            style={{
              width: "100%",
              height: "60px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Button
              onClick={submitSurvey}
              style={{ width: "100px", padding: "10px" }}
              variant="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <ErrorContainer>
          <ErrorDiv>
            <h1 style={{ color: "white" }}>{error.message}</h1>
          </ErrorDiv>
        </ErrorContainer>
      )}
    </div>
  );
}

const ErrorDiv = styled.div`
  width:100%
  height:200px;
  margin-left:2%
  margin-right:2%;
  background-color:red;
  padding:50px 100px 50px 100px;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  margin-top: 20%;
  place-items: center;
`;

const H1 = styled.h1`
  font-weight: bold;
  color: #3750eb;
  padding: 15px;
`;
const Div = styled.div`
  margin-left: 2%;
  margin-right: 2%;
  max-height: 78vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default Survey;
