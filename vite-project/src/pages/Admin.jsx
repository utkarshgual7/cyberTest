import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [isTestEnabled, setIsTestEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const fetchTestStatus = async () => {
      try {
        const response = await fetch("/api/test/getstatus");
        const data = await response.json();
        setIsTestEnabled(data.isTestEnabled);
        if (data.isTestEnabled && data.timeRemaining) {
          setTimeRemaining(data.timeRemaining);
        }
      } catch (err) {
        console.error("Error fetching test status:", err);
        setError("Failed to fetch test status");
      } finally {
        setLoading(false);
      }
    };
    fetchTestStatus();
  }, []);

  const toggleTest = async () => {
    try {
      const response = await fetch("/api/test/enabletest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTestEnabled: !isTestEnabled }),
      });
      const data = await response.json();
      if (data.success) {
        setIsTestEnabled(data.settings.isTestEnabled);
        setTimeRemaining(data.settings.isTestEnabled ? 30 * 60 : null);
      } else {
        setError("Failed to toggle test status");
      }
    } catch (err) {
      console.error("Error toggling test status:", err);
      setError("Failed to toggle test status");
    }
  };

  useEffect(() => {
    let timer;
    if (isTestEnabled && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTestEnabled, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const generateLeaderboard = async () => {
    try {
      const response = await axios.post("/api/score/generateleaderboard");
      if (response.status === 200) {
        console.log(response.data);
        setSuccessMessage(
          <div>
            Leaderboard generated successfully!{" "}
            <a href="/leaderboard">View Leaderboard</a>
          </div>
        );
      } else {
        setError("Failed to generate leaderboard");
      }
    } catch (err) {
      console.error("Error generating leaderboard:", err);
      setError("Failed to generate leaderboard");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-page" style={{ margin: "10px" }}>
      <Link to="/">
        <h1 style={{ margin: "10px" }}>Home</h1>
      </Link>
      <h1>Admin Panel</h1>
      <p>
        The test is currently:{" "}
        <strong>{isTestEnabled ? "Enabled" : "Disabled"}</strong>
      </p>
      {isTestEnabled && timeRemaining !== null && (
        <p>Time remaining: {formatTime(timeRemaining)}</p>
      )}
      <button
        className="toggle-button"
        onClick={toggleTest}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: isTestEnabled ? "red" : "green",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isTestEnabled ? "Disable Test" : "Enable Test"}
      </button>

      <button
        className="generate-leaderboard-button"
        onClick={generateLeaderboard}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "blue",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Generate Leaderboard
      </button>

      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", marginTop: "20px" }}
        >
          {successMessage} {/* Display success message */}
        </div>
      )}
    </div>
  );
};

export default Admin;
