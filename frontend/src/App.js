// src/App.js
import React, { useState, useEffect } from "react";
import QuizList from "./quizlist.js";
import QuizForm from "./quizform.js";
import AddQuestion from "./addquestion.js";
import QuizTaking from "./quiztake.js";
import HomePage from "./Home.js";
import Login from "./login.js";
import Register from "./register.js";
import { getQuizzes, deleteQuiz } from "../api";  
import './App.css';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [page, setPage] = useState("home"); 
  const [user, setUser] = useState(null);

  // ✅ Fetch quizzes
  const fetchQuizzes = async () => {
    try {
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // ✅ Quiz created → refresh list
  const handleQuizCreated = () => {
    fetchQuizzes();
    setPage("quizlist");
  };

  // ✅ Delete quiz
  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuiz(quizId);
      fetchQuizzes();
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };

  // ✅ Login
  const handleLogin = (userData) => {
    localStorage.setItem("token", userData.token);
    setUser(userData);
    setPage("home");
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPage("home");
  };

  // ✅ Take quiz
  const handleTakeQuiz = (id) => {
    setActiveQuizId(id);
    setPage("quiztake");
  };

  return (
    <div className="App">
      {/* Home */}
      {page === "home" && (
        <HomePage onNavigate={setPage} user={user} onLogout={handleLogout} />
      )}

      {/* Register */}
      {page === "register" && (
        <Register onLogin={handleLogin} onNavigate={setPage} />
      )}

      {/* Login */}
      {page === "login" && (
        <Login onLogin={handleLogin} onNavigate={setPage} />
      )}
     
      {/* Create Quiz */}
      {page === "createquiz" && user && (
        <QuizForm onQuizCreated={handleQuizCreated} onNavigate={setPage} />
      )}

      {page === "addquestion" && (
        <AddQuestion quizzes={quizzes} onNavigate={setPage} />
      )}


      {/* Quiz List */}
      {page === "quizlist" && (
        <QuizList
          quizzes={quizzes}
          onTakeQuiz={handleTakeQuiz}
          onDelete={handleDeleteQuiz}
          onBack={() => setPage("home")}
        />
      )}

      {/* Take Quiz */}
      {page === "quiztake" && activeQuizId && (
        <QuizTaking quizId={activeQuizId} onBack={() => setPage("quizlist")} />
      )}
    </div>
  );
}

export default App;
