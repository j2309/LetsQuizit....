import React from "react";
import './quizlist.css';

function QuizList({ quizzes, onTakeQuiz, onBack, onDelete }) {   // ✅ include onBack here
  if (!quizzes || quizzes.length === 0) {
    return (
      <div>
        <p>No quizzes available</p>
        {onBack && <button onClick={onBack}>⬅ Back</button>}
      </div>
    );
  }

  return (
    <div className="quiz-list">
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} style={{ marginBottom: "10px" }}>
            <strong>{quiz.title}</strong> - {quiz.description}
            <br />
            <button onClick={() => onTakeQuiz(quiz.id)}>Take Quiz</button>
            <button onClick={() => onDelete(quiz.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {onBack && (
        <button onClick={onBack} style={{ marginTop: "20px" }}>
          ⬅ Back
        </button>
      )}
    </div>
  );
}

export default QuizList;
