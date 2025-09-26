// src/components/Home.js
import React from "react";
import './home.css';

export default function HomePage({ onNavigate, user, onLogout }) {
  return (
    <div>
      <h1>Welcome to Quiz Maker!</h1>

      {user ? (
        <>
          <p>Hello, {user.username}</p>
          <button onClick={() => onNavigate("createquiz")}>Create Quiz</button>
          <button onClick={() => onNavigate("addquestion")}>Add Question</button>
          <button onClick={() => onNavigate("quizlist")}>Take Quiz</button>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => onNavigate("login")}>Login</button>
          <button onClick={() => onNavigate("register")}>Register</button>
        </>
      )}
    </div>
  );
}
