import { useEffect, useState } from "react";

export function useStorage(key: string) {
  const [bookmarksId, setBookmarksId] = useState(() => {
    const items = localStorage.getItem(key);
    console.log(items);
    return items ? JSON.parse(items) : [];
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(bookmarksId));
  }, [key, bookmarksId]);
  return { bookmarksId, setBookmarksId };
}
