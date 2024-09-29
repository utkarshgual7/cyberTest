import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Home.css";
import { logout } from "../redux/user/tempUserSlice";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const user1 = useSelector((state) => state.User1.User1);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    alert("You have been logged out successfully.");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="Home">
      <header>
        <div className="logo">
          <h1>CTF Event</h1>
        </div>
        <nav>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              {user1 && user1.role === "Admin" && (
                <li>
                  <Link to="/adminconsole">Admin</Link>
                </li>
              )}
              {user1 ? (
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="login-button">
                  Login
                </Link>
              )}
              <li>
                <Link to="/">FAQ</Link>
              </li>
            </ul>
          </div>
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Capture The Flag</h2>
          <p>Join the ultimate challenge and showcase your skills!</p>
          <div className="user-info" id="user-info">
            {user1 ? (
              <p>Welcome, {user1.name}</p>
            ) : (
              <Link to="/register" className="btn">
                Register Now
              </Link>
            )}
          </div>
        </div>
      </section>

      <section id="about">
        <h2>About the Event</h2>
        <p>
          Our CTF event challenges participants to solve security puzzles and
          capture the flags hidden in the challenges. Compete with the best and
          win exciting prizes!
        </p>
      </section>

      <section id="highlights">
        <h2>Event Highlights</h2>
        <div className="event-highlights">
          <div className="highlight">
            <Link to="/ctf">
              <h3>Cryptography</h3>
            </Link>
            <p>Challenges for all skill levels, from beginners to experts.</p>
          </div>
          <div className="highlight">
            <Link to="/imageography">
              <h3>Image Steganography</h3>
            </Link>
            <p>Top competitors will be rewarded with amazing prizes!</p>
          </div>
          <div className="highlight">
            <Link to="/webexploit">
              <h3>Web Exploitation</h3>
            </Link>
            <p>
              Meet like-minded individuals and grow your professional network.
            </p>
          </div>
        </div>
      </section>

      <section id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What is CTF?</h3>
          <p>
            CTF stands for Capture The Flag. It is a competition where
            participants solve security-related puzzles and challenges to earn
            points by finding hidden "flags."
          </p>
        </div>
        <div className="faq-item">
          <h3>Who can participate?</h3>
          <p>
            Anyone with an interest in cybersecurity and problem-solving can
            join, whether you're a beginner or an expert.
          </p>
        </div>
        <div className="faq-item">
          <h3>What do I need to participate?</h3>
          <p>
            All you need is a laptop and an internet connection. A desire to
            solve challenges will help!
          </p>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 CTF Event. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
