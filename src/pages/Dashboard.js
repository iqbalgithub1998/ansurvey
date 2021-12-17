import React, { useState, useContext, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Container, Row, Col, Image } from "react-bootstrap";
import StudyImage from "../Images/study.png";
import ListTable from "../components/ListTable";
import AuthContext from "../lib/context";
import fire from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [survey, setSurvey] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    //console.log("loading data....");

    const q = query(collection(db, "survey"), where("user", "==", user.uid));
    try {
      const querySnapshot = await getDocs(q);
      const quest = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        quest.push({
          id: doc.id,
          ...data,
        });
      });
      const sortAr = _.sortBy(quest, "date");
      const revArr = _.reverse(sortAr);
      setSurvey([...revArr]);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("anSurveyUser");
    setUser(null);
  };

  const openSurvey = (id) => {
    navigate(`/status/${id}`);
  };
  // edit a Survey ..
  const Edit = (data) => {
    navigate(`/edit/${data.id}`);
  };

  // Close or open a survey
  const Close = async (data, index) => {
    const dataArray = [...survey];
    let status = dataArray[index].status === "Closed" ? "Running" : "Closed";
    const washingtonRef = doc(db, "survey", data.id);
    try {
      await updateDoc(washingtonRef, { ...data, status: status });

      dataArray[index].status = status;
      setSurvey([...dataArray]);
    } catch (error) {
      console.log(error);
    }
  };
  const copyLink = (id) => {
    let location = window.location.href;
    location += `survey/${id}`;
    navigator.clipboard.writeText(location);
  };

  // delete A Survey
  const Delete = async (id, index) => {
    try {
      await deleteDoc(doc(db, "survey", id));
      const arrayData = [...survey];
      arrayData.splice(index, 1);
      setSurvey([...arrayData]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <DashboardHeader userEmail={user.email} logout={logout} />
      <div>
        <Container>
          <Row>
            <Col sm={2} style={{ marginLeft: "100px" }}>
              <Image
                style={{ width: "180px", height: "180px" }}
                src={StudyImage}
              />
            </Col>
            <Col sm={8} style={{ paddingTop: "80px" }}>
              <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                Get Survey response from around the world in minutes.
              </span>
              <br />
              <span style={{ fontSize: "16px", fontWeight: "light" }}>
                Easily find your ideal respondents for market research with
                AnonymousServey.
              </span>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        style={{ marginTop: "10px", marginLeft: "158px", marginRight: "158px" }}
      >
        <ListTable
          list={[...survey]}
          openSurvey={openSurvey}
          Edit={Edit}
          Close={Close}
          Delete={Delete}
          copyLink={copyLink}
        />
      </div>
    </div>
  );
}

export default Dashboard;
