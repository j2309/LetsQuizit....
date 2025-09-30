import axios from "axios";

// Base URL for backend
const API = "http://localhost:5000/api";

// ✅ Get all quizzes
export const getQuizzes = async () => {
  const res = await axios.get(`${API}/quizzes`);
  return res.data;
};

// ✅ Create a new quiz
export const createQuiz = async (quizData) => {
  const res = await axios.post(`${API}/quizzes`, quizData);
  return res.data;
};

// ✅ Get questions for a specific quiz
export const getQuestionsByQuiz = async (quizId) => {
  const res = await axios.get(`${API}/quizzes/${quizId}/questions`);
  return res.data;
};

// ✅ Add a new question to a quiz
export const addQuestion = async ({ quizId, question_text, options, answer }) => {
  const res = await axios.post(`${API}/quizzes/${quizId}/questions`, {
    question_text,
    options, // should be an array: ["A", "B", "C", "D"]
    answer   // correct answer (string or option value)
  });
  return res.data;
};

// ✅ Delete a quiz
export const deleteQuiz = async (quizId) => {
  const res = await axios.delete(`${API}/quizzes/${quizId}`);
  return res.data;
};

// ✅ Register
export const registerAPI = async (userData) => {
  const res = await axios.post(`${API}/register`, userData);
  return res.data;
};

// ✅ Login
export const loginAPI = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials);
  return res.data;
};
