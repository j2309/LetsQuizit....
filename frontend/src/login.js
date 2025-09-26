import React, { useState } from "react";
import { loginAPI } from "../api";
import BackButton from "./BackButton";
import './login.css'

function Login({ onLogin, onNavigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginAPI({ username, password });
      localStorage.setItem("token", userData.token); // save token
      onLogin(userData); // update App state
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div>
       <BackButton onBack={() => onNavigate("home")} />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don’t have an account?{" "}
        <button onClick={() => onNavigate("register")}>Register</button>
      </p>
    </div>
  );
}

export default Login;
