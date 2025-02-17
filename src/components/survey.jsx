import React, { useState } from "react";
import "../index.css"; 


const QUESTIONS = [
  {
    id: 1,
    text: "How satisfied are you with our products?",
    type: "rating",
    max: 5,
  },
  {
    id: 2,
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    max: 5,
  },
  {
    id: 3,
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    max: 5,
  },
  {
    id: 4,
    text: "On a scale of 1-10 how would you recommend us to your friends and family?",
    type: "rating",
    max: 10,
  },
  { id: 5, text: "What could we do to improve our service?", type: "text" },
];

export default function Survey({ sessionId, setStartSurvey }) {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  
  const handleAnswer = (value) => {
    const currentQuestion = QUESTIONS[currentIndex];
    const updatedAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(updatedAnswers);
    localStorage.setItem("surveyAnswers", JSON.stringify(updatedAnswers));
  };

  const navigate = (step) => {
    const nextIndex = currentIndex + step;
    if (nextIndex >= 0 && nextIndex < QUESTIONS.length) {
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => navigate(1);

  const handleSubmit = () => {
    
    const confirmSubmit = window.confirm(
      "Are you sure you want to submit your answers?"
    );
    if (confirmSubmit) {
      const surveyData = {
        sessionId,
        answers,
        status: "COMPLETED",
      };
      localStorage.setItem(`survey-${sessionId}`, JSON.stringify(surveyData));
      setCompleted(true);
      setTimeout(() => {
        setAnswers({});
        setCurrentIndex(0);
        setCompleted(false);
        setStartSurvey(false);
      }, 5000);
    }
  };

  if (completed)
    return (
      <div className="container">
        <div className="text-center"  style={{textAlign:"center"}}>
          Thank you for your time! Redirecting to welcome screen...
        </div>
      </div>
    );

  const question = QUESTIONS[currentIndex];

  return (
    <div className="container">
      <div className="question-number">
        Question {currentIndex + 1}/{QUESTIONS.length}
      </div>

      <div className="question-text">{question.text}</div>

      {question.type === "rating" && (
        <div className="rating-buttons">
          {[...Array(question.max)].map((_, i) => (
            <button
              key={i}
              className={`rating-button ${
                answers[question.id] === i + 1 ? "selected" : ""
              }`}
              onClick={() => handleAnswer(i + 1)}
            >
              {i + 1} ⭐
            </button>
          ))}
        </div>
      )}

      {question.type === "text" && (
        <textarea
          className="textarea"
          value={answers[question.id] || ""}
          onChange={(e) => handleAnswer(e.target.value)}
          placeholder="Your feedback here..."
        />
      )}

      <div className="buttons">
        <button
          className={`button button-previous ${
            currentIndex === 0 ? "" : "active"
          }`}
          onClick={() => navigate(-1)}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <button className="button button-skip" onClick={handleSkip}>
          Skip
        </button>

        {currentIndex === QUESTIONS.length - 1 ? (
          <button className="button button-submit" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="button button-next" onClick={() => navigate(1)}>
            Next
          </button>
        )}
      </div>

    </div>
  );
}
