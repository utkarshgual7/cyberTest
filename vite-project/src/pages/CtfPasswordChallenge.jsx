import React, { useState } from "react";
import axios from "axios";
import "../styles/Crypto.css"; // Assuming this exists and styles are correct
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CtfPasswordChallenge = () => {
  const { name, email } = useSelector((state) => state.User1.User1.user);
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const navigate = useNavigate();

  const submitPassword = async () => {
    try {
      const response = await axios.post("/api/score/submit-password-phase1", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setResult("Password correct! You may proceed to =>");
        setIsError(false);
        setCanProceed(true); // Enable the next test
      } else {
        setResult(response.data.message || "Incorrect password.");
        setIsError(true);
        setCanProceed(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setResult(error.response.data.message);
      } else {
        setResult("Error submitting password. Please try again.");
      }
      setIsError(true);
    }
  };

  const downloadFile = async () => {
    try {
      const response = await fetch(
        "https://drive.google.com/uc?export=download&id=16vLL009yoCs3ejLSb6iAWqBpZJrPDm7g"
      );
      if (!response.ok) throw new Error("Network response was not ok");

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
    }
  };

  // Inline styles
  const resultMessageStyle = {
    padding: "15px",
    marginTop: "20px",
    borderRadius: "5px",
    fontSize: "15px",
    fontWeight: "bold",
  };

  const errorMessageStyle = {
    ...resultMessageStyle,
    border: "1px solid #f44336",
    backgroundColor: "#ffebee",
    color: "#f44336",
  };

  const successMessageStyle = {
    ...resultMessageStyle,
    border: "1px solid #4CAF50",
    backgroundColor: "#f9f9f9",
    color: "#4CAF50",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "16px",
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
            Blockchain Technology: An Overview
            <br />
            <strong>Blockchain technology</strong> is a decentralized and
            distributed ledger system that enables secure, transparent, and{" "}
            <strong>tamper-proof</strong> recording of{" "}
            <strong>Transaction</strong>. Initially introduced in 2008 as the
            underlying technology for <strong>Bitcoin</strong> by an{" "}
            <strong>anonymous</strong> entity known as{" "}
            <strong>Satoshi Nakamoto</strong>, blockchain has evolved to power
            various applications beyond <strong>cryptocurrencies</strong>.
          </p>
          <p>
            The roots of <strong>cryptography</strong> can be traced back to
            ancient Egypt, where hieroglyphs were used to obscure messages, and
            to the Roman Empire, where Julius Caesar employed a substitution
            cipher known as the <strong>Caesar Cipher</strong> to protect
            military communications.
          </p>
          <p>
            Over the centuries, <strong>cryptographic techniques</strong> have
            advanced alongside technological developments. During World War II,{" "}
            <strong>encryption</strong> played a pivotal role in warfare, with
            machines like the German <strong>Enigma</strong> encoding messages,
            while Allied <strong>cryptographers</strong>, including Alan Turing,
            worked tirelessly to break these codes.
          </p>
          <br />
          <br />
          <button
            onClick={downloadFile}
            className="btn"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = buttonStyle.backgroundColor)
            }
            onMouseDown={(e) =>
              (e.target.style.transform = buttonActiveStyle.transform)
            }
            onMouseUp={(e) => (e.target.style.transform = "none")}
          >
            DOWNLOAD PDF FILE
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
          />
          <button onClick={submitPassword} style={password ? buttonStyle : buttonDisabledStyle}>
            Submit
          </button>

          {/* Display result message */}
          {result && (
            <div
              style={isError ? errorMessageStyle : successMessageStyle}
              aria-live="polite"
            >
              {result}
              {canProceed && (
                <a
                  style={{ ...buttonStyle, marginLeft: "10px" }}
                  href="/imageography"
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

export default CtfPasswordChallenge;