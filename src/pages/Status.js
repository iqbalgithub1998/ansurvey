import React, { useState, useEffect } from "react";
import fire from "../lib/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import "./status.css";
import SurveyDetails from "../components/SurveyDetails";
function Status() {
  const { id } = useParams();
  const db = getFirestore();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([
    // {
    //   date: "12/03/2021",
    //   answer: ["yes", "i m fine", "No"],
    // },
    // {
    //   date: "13/03/2021",
    //   answer: ["No", "i m fine", "never"],
    // },
    // {
    //   date: "14/03/2021",
    //   answer: ["yes", "i m fine", "yes"],
    // },
    // {
    //   date: "14/03/2021",
    //   answer: ["NO", "i m not fine", "No"],
    // },
  ]);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const docRef = doc(db, "survey", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      //console.log(data);
      setTitle(data.title);
      setQuestions([...data.questions]);
      setResponse([...data.responses]);
    } else {
    }
  };
  return (
    <div>
      <div className="backArrow">
        <Link to="/">
          <ImArrowLeft2 style={{ width: "30px", height: "30px" }} />
        </Link>
      </div>
      <SurveyDetails title={title} questions={questions} responses={response} />
    </div>
  );
}

export default Status;
