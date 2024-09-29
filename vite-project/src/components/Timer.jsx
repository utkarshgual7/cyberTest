import React, { useEffect, useState } from "react";

const Timer = ({ onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(0); // Default to 0

  useEffect(() => {
    // Function to fetch the remaining time from the backend API
    const fetchRemainingTime = async () => {
      try {
        const response = await fetch("api/test/getRemainingTime");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTimeLeft(data.remainingTime); // Assuming your API returns { remainingTime }
      } catch (error) {
        console.error("Error fetching remaining time:", error);
      }
    };

    fetchRemainingTime();

    // Set an interval to fetch the time every minute
    const intervalId = setInterval(fetchRemainingTime, 60000); // Fetch every minute

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          onTimeout(); // Call onTimeout when time is up
          clearInterval(timerId); // Stop the timer
          return 0;
        }
        return Math.max(0, prev - 1000); // Decrease time left by 1 second
      });
    }, 1000);

    return () => clearInterval(timerId); // Cleanup timer on unmount or when timeLeft changes
  }, [onTimeout]);

  // Helper function to format time left in MM:SS
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <h1>Time Remaining: {formatTime(timeLeft)}</h1>
    </div>
  );
};

export default Timer;
