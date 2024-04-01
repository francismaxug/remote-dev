import { createContext } from "react";
import { useStorage } from "../hooks/useLocalStorage";
import { useJobItems } from "../hooks/useJobItems";
import { SingleJob } from "../components/types";

type BkMarks = {
  bookmarksId: number[];
  handleToggleBookmark: (id: number) => void;
  bookMarksJobItems: SingleJob[];
  isLoadingI: boolean;
};

export const BookMrksCon = createContext<BkMarks | null>(null);

export default function BookmarksContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const { bookmarksId, setBookmarksId } = useStorage("bookmarks");
  const { jobItems: bookMarksJobItems, isLoadingI } = useJobItems(bookmarksId);

  const handleToggleBookmark = (id: number) => {
    if (bookmarksId.includes(id)) {
      setBookmarksId((pre: number[]) =>
        pre.filter((item: number) => item !== id)
      );
    } else {
      setBookmarksId((pre: number[]) => [...pre, id]);
    }
  };
  return (
    <BookMrksCon.Provider
      value={{
        handleToggleBookmark,
        bookmarksId,
        bookMarksJobItems,
        isLoadingI,
      }}
    >
      {children}
    </BookMrksCon.Provider>
  );
}
