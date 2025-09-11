import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Message.css";

const Imageograpghy = () => {
    const { name, email } = useSelector((state) => state.User1.User1.user);
  
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState(""); // 'error' or 'success'
  const [canProceed, setCanProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitPassword = async () => {
    if (!password.trim()) {
      setResult("Please enter a password.");
      setResultType("error");
      return;
    }

    setIsLoading(true);
    setResult("");
    setResultType("");

    try {
      const response = await axios.post("/api/score/submit-password-phase2", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setResult("Password correct! You may proceed to =>");
        setResultType("success");
        setCanProceed(true);
      } else {
        setResult(response.data.message || "Incorrect password.");
        setResultType("error");
        setCanProceed(false);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error status
        if (error.response.data && error.response.data.message) {
          setResult(error.response.data.message);
        } else if (error.response.status === 401) {
          setResult("Authentication failed. Please log in again.");
        } else if (error.response.status === 400) {
          setResult("Invalid submission. Please try again.");
        } else {
          setResult("Error submitting password. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response received
        setResult("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        setResult("An unexpected error occurred. Please try again.");
      }
      setResultType("error");
      setCanProceed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async () => {
    try {
      const response = await fetch(
        "https://drive.google.com/uc?export=download&id=1zWzZs4FWUI60xoz7FenmJ6XTRB4I1bsh"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ctf.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Error downloading the file. Please try again.");
    }
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "12px",
    transition: "background-color 0.3s, transform 0.3s",
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo">
          <h1>CTF Password Challenge</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="../../index.html">About CTF</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to CTF 2024</h2>
          <p>
            Solve the challenge and <strong>crack the password!</strong>
          </p>
          <p>
            Image steganography is a technique of hiding information within
            digital images in such a way that the existence of the concealed
            message remains undetected...
          </p>
          {/* Download Image Button */}
          <button onClick={downloadFile} className="btn" style={buttonStyle}>
            Download Image to crack
          </button>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="quiz-section">
        <h2>Capture the Flag Quiz</h2>
        <p>Can you find the password hidden in the paragraph?</p>

        <div className="quiz-container">
          <p className="quiz-clue">
            "To unlock the secret box, count the letters in each word of this
            clue. Combine these numbers to get the password."
          </p>

          <input
            type="password"
            id="password"
            style={{ padding: "10px", margin: "5px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the password"
            aria-label="Enter password"
            disabled={isLoading}
          />
          <button 
            onClick={submitPassword} 
            style={isLoading ? buttonDisabledStyle : buttonStyle}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          
          {/* Display result message */}
          {result && (
            <div className={`message ${resultType}`}>
              {result}
              {canProceed && (
                <a 
                  style={{...buttonStyle, marginLeft: "10px", textDecoration: "none"}} 
                  href="/webexploit"
                >
                  Next Test
                </a>
              )}
            </div>
          )}
          <div id="hint">
            <p>
              Hint: Count the letters in each word, and combine those numbers to
              form the password.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Capture the Flag (CTF)</h2>
        <p>
          Capture the Flag (CTF) is a cybersecurity competition where
          participants solve challenges to find hidden "flags". Challenges often
          involve cryptography, hacking, and solving puzzles like the one above!
        </p>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 CTF Event. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Imageograpghy;