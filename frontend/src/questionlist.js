import React, { useState, useEffect } from "react";
import { getQuestionsByQuiz } from "../api";
import './questionlist.css'

function QuestionList({ quizId }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsByQuiz(quizId);
        setQuestions(data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, [quizId]);
  return (
    <div>
      <h4>Questions</h4>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              <strong>{q.question_text}</strong>
              <ul>
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
              <p>✅ Answer: {q.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionList;
