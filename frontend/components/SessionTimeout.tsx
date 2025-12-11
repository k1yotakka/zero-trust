"use client";

import { useEffect, useState } from "react";

interface SessionTimeoutProps {
  timeoutMinutes?: number;     
  onTimeout: () => void;        
}

export default function SessionTimeout({
  timeoutMinutes = 15,
  onTimeout,
}: SessionTimeoutProps) {
  const [remaining, setRemaining] = useState(
    timeoutMinutes * 60 * 1000 
  );

  useEffect(() => {
    let lastActivity = Date.now();

    const refreshActivity = () => {
      lastActivity = Date.now();
      setRemaining(timeoutMinutes * 60 * 1000);
    };

    window.addEventListener("mousemove", refreshActivity);
    window.addEventListener("keydown", refreshActivity);

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      const left = timeoutMinutes * 60 * 1000 - elapsed;

      setRemaining(left);

      if (left <= 0) {
        onTimeout(); 
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", refreshActivity);
      window.removeEventListener("keydown", refreshActivity);
      clearInterval(interval);
    };
  }, [timeoutMinutes, onTimeout]);

  const minutes = Math.max(0, Math.floor(remaining / 60000));
  const seconds = Math.max(0, Math.floor((remaining % 60000) / 1000));

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow text-sm">
      Auto logout in {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}
