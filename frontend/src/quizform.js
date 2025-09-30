import React, { useState } from "react";
import { createQuiz } from "./api";
import BackButton from "./BackButton";
import './quizform.css'

function QuizForm({ onQuizCreated, onNavigate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuiz = await createQuiz({ title, description, user_id: 1 }); 
      if (onQuizCreated) onQuizCreated(newQuiz); // refresh quiz list in parent
      if (onNavigate) onNavigate("quizlist");   // ✅ go back to quizList
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Quiz</h3>
      <BackButton onBack={() => onNavigate("home")} />
      <div>
        <label>Title:</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Quiz</button>
    </form>
  );
}

export default QuizForm;

