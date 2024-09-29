import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/Login.css"; // Make sure to create this CSS file
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/tempUserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    textDecoration: "none",
    background: "none",
    color: isHovered ? "#ff6347" : "#fff", // Changes color on hover
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(signInSuccess(data));
        setMessage("Login successful!");
        navigate("/");
        // Optionally redirect or perform additional actions
      } else {
        dispatch(signInFailure(data.message || "Login failed"));
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      dispatch(signInFailure(data.message || "Login failed"));
      setMessage("An error occurred. Please try again later.");
    }

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <a
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          href="/"
        >
          Back to home
        </a>
      </form>
      {message && <div className="message">{message}</div>}

      {/* Display error messages */}
    </div>
  );
};

export default Login;
