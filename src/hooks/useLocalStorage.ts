import { useEffect, useState } from "react";

export function useStorage<T>(key: string, initialValue: T) {
  const [bookmarksId, setBookmarksId] = useState(() => {
    const items = localStorage.getItem(key);
    console.log(items);
    return items ? JSON.parse(items) : JSON.stringify(initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(bookmarksId));
  }, [key, bookmarksId]);
  return { bookmarksId, setBookmarksId };
}
