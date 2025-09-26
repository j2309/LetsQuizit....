const express = require("express");
const cors = require("cors");
const pool = require("./dbconnect"); // PostgreSQL connection
const authRoutes = require("./routes/authroutes");
const quizRoutes = require("./routes/quizroutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", authRoutes);          // authentication
app.use("/api/quizzes", quizRoutes);  // quizzes + questions

// Root route
app.get("/", (req, res) => {
  res.send("Quiz API running with PostgreSQL...");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
