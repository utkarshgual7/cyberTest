import React, { useState } from "react";
import axios from "axios"; // Missing import
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Imageograpghy = () => {
  const { name, email } = useSelector((state) => state.User1.User1);
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [canProceed, setCanProceed] = useState(false); // Added state for enabling next test

  const navigate = useNavigate();

  const submitPassword = async () => {
    try {
      const response = await axios.post("/api/score/submit-password-phase2", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setResult("Password correct! You may proceed to =>");
        setCanProceed(true); // Enable the next test
      } else {
        setResult("Incorrect password.");
        setCanProceed(false);
      }
    } catch (error) {
      setResult(error.response?.data?.message || "Error submitting password.");
    }
  };

  const downloadFile = async () => {
    try {
      const response = await fetch(
        "https://drive.google.com/uc?export=download&id=16vLL009yoCs3ejLSb6iAWqBpZJrPDm7g" // Adjusted URL for direct download
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ctf.pdf"; // Set the file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const resultMessageStyle = {
    padding: "15px",
    marginTop: "20px",
    border: "1px solid #4CAF50",
    backgroundColor: "#f9f9f9",
    color: "#4CAF50",
    borderRadius: "5px",
    fontSize: "15px",
    fontWeight: "bold",
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
          <a
            href="https://drive.google.com/uc?export=download&id=1zWzZs4FWUI60xoz7FenmJ6XTRB4I1bsh" // Updated download URL
            download
            className="btn"
          >
            Download Image to crack
          </a>
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
          />
          <button onClick={submitPassword} style={buttonStyle}>
            Submit
          </button>
          {/* Display result message */}
          {result && (
            <p style={resultMessageStyle}>
              {result}
              {canProceed && (
                <a style={buttonStyle} href="/webexploit">
                  Next Test
                </a>
              )}
            </p>
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
