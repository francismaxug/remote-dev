import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";
import { Iobj } from "./types";

export default function JobListItem({
  items,
  isLoading,
}: {
  items: Iobj;
  isLoading: boolean;
}) {
  if (isLoading) return <Spinner />;

  return (
    <li className="job-item">
      <a href={`#${items.id}`} className="job-item__link">
        <div className="job-item__badge">{items.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{items.title}</h3>
          <p className="job-item__company">{items.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{items.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
