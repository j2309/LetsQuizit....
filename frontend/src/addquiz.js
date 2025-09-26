// src/components/AddQuiz.js
import React, { useState } from "react";
import { createQuiz } from "../api";
import "./addquiz.css";

function AddQuiz({ onQuizCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setLoading(true);
      const data = await createQuiz({ title, description });
      console.log("Quiz created:", data);
      setTitle("");
      setDescription("");
      setSuccess("✅ Quiz created successfully!");
      if (onQuizCreated) onQuizCreated(); // refresh quiz list
    } catch (err) {
      console.error("Error creating quiz:", err);
      setError("Failed to create quiz. Check backend and network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addquiz-container">
      <h2>Add Quiz</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Quiz"}
        </button>
      </form>
    </div>
  );
}

export default AddQuiz;
