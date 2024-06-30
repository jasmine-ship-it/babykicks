import { createContext, useState } from "react";

export const TimeContext = createContext({
  timeData: null,
  setTimeData: () => null,
});

export const TimeProvider = ({ children }) => {
  const [timeData, setTimeData] = useState({
    startTime: null,
    startHours: null,
    startMinutes: null,
    startSeconds: null,
    stopTime: null,
    stopHours: null,
    stopMinutes: null,
    stopSeconds: null,
    hoursDiff: null,
    minsDiff: null,
    secsDiff: null,
  });
  const value = { timeData, setTimeData };
  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};
