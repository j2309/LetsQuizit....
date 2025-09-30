import React, { useState, useEffect } from "react";
import { getQuizzes, addQuestion } from "./api";

function AddQuestion({ onNavigate }) {
  // 🔹 State variables
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  // 🔹 Load quizzes for dropdown
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };
    fetchQuizzes();
  }, []);

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedQuizId || !questionText || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      await addQuestion({
        quizId: parseInt(selectedQuizId, 10), // ✅ integer
        question_text: questionText,
        options: [option1, option2, option3, option4], // ✅ array for JSONB
        answer: correctAnswer,
      });

      alert("✅ Question added successfully!");
      onNavigate("quizlist"); // go back to quiz list
    } catch (err) {
      console.error("❌ Error adding question:", err);
      alert("Failed to add question. Check backend logs.");
    }
  };

  return (
    <div>
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        {/* 🔹 Quiz dropdown */}
        <select value={selectedQuizId} onChange={(e) => setSelectedQuizId(e.target.value)} required>
          <option value="">-- Select Quiz --</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.title}
            </option>
          ))}
        </select>

        {/* 🔹 Question text */}
        <input
          type="text"
          placeholder="Enter question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />

        {/* 🔹 Options */}
        <input type="text" placeholder="Option 1" value={option1} onChange={(e) => setOption1(e.target.value)} required />
        <input type="text" placeholder="Option 2" value={option2} onChange={(e) => setOption2(e.target.value)} required />
        <input type="text" placeholder="Option 3" value={option3} onChange={(e) => setOption3(e.target.value)} required />
        <input type="text" placeholder="Option 4" value={option4} onChange={(e) => setOption4(e.target.value)} required />

        {/* 🔹 Correct Answer */}
        <input
          type="text"
          placeholder="Correct answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />

        <button type="submit">Add Question</button>
      </form>

      <button onClick={() => onNavigate("quizlist")}>Back to Quiz List</button>
    </div>
  );
}

export default AddQuestion;

