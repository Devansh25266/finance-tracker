import { useState, useEffect } from 'react';
export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s === null ? initial : JSON.parse(s);
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage full or blocked */ }
  }, [key, value]);
  return [value, setValue];
}
