import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // mode transition function
  const transition = function(newMode, replace = false) {
    setHistory(prev => {
      setMode(newMode);
      const newHistory = [...prev, newMode];
      if (replace) {
        newHistory.splice(-2, 2, newMode);
      }
      return newHistory;
    });
  };
  
  // mode back function
  const back = function() {
    if (history.length > 1) {
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        setMode(newHistory.at(-1));
        return newHistory;
      });
    }
  };

  return { mode, transition, back };
};