import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBokkmark } from "../hooks/useJobItems";
export default function BookmarkIcon({ id }: { id: number }) {
  const { handleToggleBookmark, bookmarksId } = useBokkmark();
  console.log(bookmarksId);
  return (
    <button
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        handleToggleBookmark(id);
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarksId.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
