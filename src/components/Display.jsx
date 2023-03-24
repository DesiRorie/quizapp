import React, { useState, useEffect } from "react";

const Display = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState("");
  const [renderResult, setRenderResult] = useState(true);
  const [answered, setAnswered] = useState(false);
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=50&difficulty=medium&type=boolean"
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  const handleButtonClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setAnswered(false);
    setRenderResult(false);
  };
  const checkAnswer = (e) => {
    const answer = e.target.value;
    const currentQuestion = questions[currentQuestionIndex];

    if (
      currentQuestion.correct_answer.toLowerCase() ===
      answer.toString().toLowerCase()
    ) {
      setShowResult("Correct!");
    } else {
      setShowResult("Incorrect!");
    }

    setRenderResult(true);
    setAnswered(true);
  };
  return (
    <div className="displayBox">
      <div className="displayChild">
        <h3>True Or False?</h3>
        <h2>
          {questions.length > 0 && questions[currentQuestionIndex].question}
        </h2>
        <button onClick={checkAnswer} value={true}>
          True
        </button>
        <button id="skipButton" onClick={handleButtonClick}>
          Skip!
        </button>
        <button onClick={checkAnswer} value={false}>
          False
        </button>
        <h1 className={showResult == "Correct!" ? "green" : "red"}>
          {renderResult && showResult}
        </h1>

        {answered && (
          <button id="skipButton" onClick={handleButtonClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Display;
