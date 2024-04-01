import { forwardRef } from "react";
import { useBokkmark } from "../hooks/useJobItems";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookMarksJobItems, isLoadingI } = useBokkmark();
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookMarksJobItems} isLoading={isLoadingI} />
    </div>,
    document.body
  );
});
export default BookmarksPopover;
