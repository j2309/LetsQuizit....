import React, { useState } from "react";
import { registerAPI } from "./api";
import BackButton  from "./BackButton";
import './register.css'

function Register({ onLogin, onNavigate }) {   // ✅ match App.js
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await registerAPI({ username, password });
      localStorage.setItem("token", userData.token); // ✅ save token
      onLogin(userData); // ✅ call the same login handler from App.js
    } catch (err) {
      console.error("Register error:", err);
      setError("Username may already exist or server error");
    }
  };

  return (
    <div>
       <BackButton onBack={() => onNavigate("home")} />
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => onNavigate("login")}>Login</button>
      </p>
    </div>
  );
}

export default Register;

