import { useBokkmark } from "../hooks/useJobItems";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookMarksJobItems, isLoadingI } = useBokkmark();
  return (
    <div className="bookmarks-popover">
      <JobList jobItems={bookMarksJobItems} isLoading={isLoadingI} />
    </div>
  );
}
