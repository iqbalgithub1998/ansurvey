import "./App.css";
import React, { useState, useEffect } from "react";
//import Homepage from "./pages/Homepage";
import Login from "./pages/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSurvey from "./pages/CreateSurvey";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./lib/context";
import { getWithExpiry } from "./lib/localStorage";
import Status from "./pages/Status";
import Survey from "./pages/Survey";
function App() {
  const location = window.location.href;
  let url = location.split("/");
  const [user, setUser] = useState(null);
  useEffect(() => {
    let user = getWithExpiry("anSurveyUser");
    if (user != null) {
      setUser({ ...user });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {url[3] === "survey" ? (
        <Router>
          <Routes>
            <Route path="/survey/:id" exact element={<Survey />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          {user === null ? (
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<Register />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/create" exact element={<CreateSurvey />} />
              <Route path="/edit/:id" exact element={<CreateSurvey />} />
              <Route path="/status/:id" exact element={<Status />} />
            </Routes>
          )}
        </Router>
      )}
    </AuthContext.Provider>
  );
}

export default App;
