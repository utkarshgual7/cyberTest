import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "../styles/Login.css";
import "../styles/Message.css";
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
  const [messageType, setMessageType] = useState(""); // 'error' or 'success'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    textDecoration: "none",
    background: "none",
    color: isHovered ? "#ff6347" : "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setMessage("");
    setMessageType("");

    // Basic validation
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

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
        setMessageType("success");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // Handle specific error cases
        if (response.status === 401) {
          setMessage(data.message || "Invalid email or password. Please try again.");
        } else if (data.message) {
          setMessage(data.message);
        } else {
          setMessage("Login failed. Please try again.");
        }
        setMessageType("error");
        dispatch(signInFailure(data.message || "Login failed"));
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
      dispatch(signInFailure("Network error. Please try again later."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={isLoading ? "loading" : ""}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className="btn"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
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
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;