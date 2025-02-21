import { useState, useEffect } from "react";

const CountdownTimer = ({ createdAt }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!createdAt) {
      setTimeRemaining("N/A");
      return;
    }

    // Convert createdAt to Date and adjust to IST (UTC+5:30)
    const createdAtDate = new Date(createdAt);
    const istOffset = 5.5 * 60 * 60 * 1000; // Convert 5 hours 30 minutes to ms
    const createdAtIST = new Date(createdAtDate.getTime());

    // Expiration time (48 hours from createdAt in IST)
    const expirationTime = new Date(createdAtIST.getTime() + 13 * 60 * 60 * 1000);

    const updateTimer = () => {
      const now = new Date();
      const nowIST = new Date(now.getTime()); // Convert current time to IST

      const diffMs = expirationTime.getTime() - nowIST.getTime()-istOffset; // Difference in milliseconds

      if (diffMs <= 0) {
        setTimeRemaining("Expired");
        return;
      }

      const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Convert ms to hours
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining ms to minutes

      setTimeRemaining(`${diffHours}h ${diffMinutes}m remaining`);
    };

    updateTimer(); // Run immediately

    const interval = setInterval(updateTimer, 60 * 1000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [createdAt]);

  return <span>{timeRemaining}</span>;
};

export default CountdownTimer;
