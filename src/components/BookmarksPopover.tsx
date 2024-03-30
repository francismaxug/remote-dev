import { forwardRef } from "react";
import { useBokkmark } from "../hooks/useJobItems";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookMarksJobItems, isLoadingI } = useBokkmark();
  return (
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookMarksJobItems} isLoading={isLoadingI} />
    </div>
  );
});
export default BookmarksPopover;
