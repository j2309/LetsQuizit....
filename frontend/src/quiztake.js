import React, { useState, useEffect } from "react";
import { getQuestionsByQuiz } from "../api";
import BackButton from "./BackButton";

// Function to shuffle options
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function QuizTaking({ quizId, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsByQuiz(quizId);

        // Shuffle options for each question
        const shuffledData = data.map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }));

        setQuestions(shuffledData);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, [quizId]);

  if (questions.length === 0) {
    return (
      <div>
        <h3>No questions available for this quiz.</h3>
        <BackButton onBack={onBack} />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateScore();
      setShowScore(true);
    }
  };

  const calculateScore = () => {
    let tempScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) tempScore += 1;
    });
    setScore(tempScore);
  };

  if (showScore) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>
          You scored {score} out of {questions.length}
        </p>
        <button onClick={onBack}>Back to Quiz List</button>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p>{currentQuestion.question_text}</p>
      <div>
        {currentQuestion.options.map((opt, idx) => (
          <div key={idx}>
            <input
              type="radio"
              name={`question_${currentQuestion.id}`}
              value={opt}
              checked={answers[currentQuestion.id] === opt}
              onChange={() => handleOptionSelect(opt)}
            />
            <label>{opt}</label>
          </div>
        ))}
      </div>
      <button onClick={handleNext}>
        {currentIndex + 1 === questions.length ? "Submit" : "Next"}
      </button>
      <button onClick={onBack}>Back to Quiz List</button>
    </div>
  );
}

export default QuizTaking;
