import React, { useState } from "react";
import "../styles/Register.css";
import "../styles/Message.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'error' or 'success'
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setMessage("");
    setMessageType("");

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful! Please log in.");
        setMessageType("success");
        // Clear form fields on success
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        // Handle specific error cases
        if (data.message) {
          setMessage(data.message);
        } else if (data.error) {
          // Handle error object if present
          if (data.error.code === 'EMAIL_EXISTS') {
            setMessage('This email is already registered.');
          } else if (data.error.code === 'USERNAME_EXISTS') {
            setMessage('This username is already taken.');
          } else if (data.error.code === 'WEAK_PASSWORD') {
            setMessage('Password is too weak. Please use a stronger password.');
          } else {
            setMessage('Registration failed: ' + data.error.message);
          }
        } else if (data.errors) {
          // Handle validation errors array
          const validationErrors = Object.values(data.errors).join(' ');
          setMessage(validationErrors);
        } else {
          setMessage("Registration failed. Please try again.");
        }
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        <form className={`register-form ${isLoading ? "loading" : ""}`} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="register-btn"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        {message && (
          <p className={`message ${messageType}`}>
            {message}
          </p>
        )}
        <p>
          Already have an account?{" "}
          <a style={{ color: "black" }} href="/login">
            login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;