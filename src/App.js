
import React, { useState, useEffect } from "react";
import Survey from "./components/survey";
import "./index.css";


const generateSessionId = () =>
  `session-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [startSurvey, setStartSurvey] = useState(false);

  // Initialize session
  useEffect(() => {
    if (!sessionId) {
      const newSession = generateSessionId();
      setSessionId(newSession);
      localStorage.setItem("surveySession", newSession);
    }
  }, [sessionId]);

  const handleStart = () => {
    setStartSurvey(true); // Set to true to show the survey component
  };

  if (!startSurvey) {
    return (
      <div className="app-container">
        <h1 className="title">Welcome to Our Customer Survey!</h1>
        <button onClick={handleStart} className="start-button">
          Start Survey
        </button>
      </div>
    );
  }

  return <Survey sessionId={sessionId} setStartSurvey={setStartSurvey} />;
}
