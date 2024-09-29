import React, { useState } from "react";
import "../styles/Register.css";

const Register = () => {
  const [name, setName] = useState(""); // Changed from username to name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Use name here
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful! Please log in.");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }

    // Clear form fields
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>{" "}
            {/* Changed label from Username to Name */}
            <input
              type="text"
              id="name" // Changed id from username to name
              name="name" // Changed name from username to name
              value={name}
              onChange={(e) => setName(e.target.value)} // Changed from setUsername to setName
              required
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
            />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        {message && <p className="message">{message}</p>}
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
