const express = require("express");
const pool = require("../dbconnect");

const router = express.Router();

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM quizzes");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching quizzes:", err.message);
    res.status(500).send("Server Error");
  }
});

// Create a quiz
router.post("/", async (req, res) => {
  const { title, description, user_id } = req.body;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const result = await pool.query(
      "INSERT INTO quizzes (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description || "", user_id || null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error creating quiz:", err.message);
    res.status(500).send("Server Error");
  }
});

// Get questions for a quiz
router.get("/:quizId/questions", async (req, res) => {
  const { quizId } = req.params;

  try {
    const result = await pool.query(
      "SELECT id, question_text, options, answer FROM questions WHERE quiz_id = $1 ORDER BY RANDOM()",
      [quizId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching questions:", err.message);
    res.status(500).send("Server Error");
  }
});

// Add a question
router.post("/:quizId/questions", async (req, res) => {
  console.log("REQ PARAMS:", req.params);
  console.log("REQ BODY:", req.body);
  const { quizId } = req.params;
  const { question_text, options, answer } = req.body;

  if (!quizId || !question_text || !options || !answer) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO questions (quiz_id, question_text, options, answer) VALUES ($1, $2, $3, $4) RETURNING *",
      [quizId, question_text,  JSON.stringify(options), answer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding question:", err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a quiz
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM quizzes WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting quiz:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
