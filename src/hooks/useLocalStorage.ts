import { useEffect, useState } from "react";

export function useStorage<T>(key: string, initialValue: T):[T,  React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : JSON.stringify(initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as const;
}
