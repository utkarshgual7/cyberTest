import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import CtfPasswordChallenge from "./pages/CtfPasswordChallenge.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Imageograpghy from "./pages/imageographhy.jsx";
import WebExploit from "./pages/WebExploit.jsx";
import Admin from "./pages/Admin.jsx";
import Timer from "./components/Timer.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isTestEnabled, setIsTestEnabled] = useState(false);

  useEffect(() => {
    fetch("api/test/getstatus")
      .then((response) => response.json())
      .then((data) => {
        setIsTestEnabled(data.isTestEnabled); // Set test enabled status
        setLoading(false); // Stop loading after fetching data
      })
      .catch((err) => {
        console.error("Error fetching test status:", err);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const handleTimeout = () => {
    // Callback for when the timer reaches zero
    setIsTestEnabled(false); // Automatically disable the test
    // Optionally, you can show an alert or redirect the user
    alert("The test has ended.");
  };

  if (loading) {
    // Show a loading spinner or message while the test status is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isTestEnabled && <Timer onTimeout={handleTimeout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/ctf"
            element={isTestEnabled ? <CtfPasswordChallenge /> : <Home />}
          />
          <Route
            path="/imageography"
            element={isTestEnabled ? <Imageograpghy /> : <Home />}
          />
          <Route
            path="/webexploit"
            element={isTestEnabled ? <WebExploit /> : <Home />}
          />
          <Route path="/adminconsole" element={<Admin />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
