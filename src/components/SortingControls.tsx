import { useJobItemsContext } from "../hooks/useJobItems";

export default function SortingControls() {
  const { sortedBy, handleSortedBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={handleSortedBy}
        className={`sorting__button sorting__button--relevant ${
          sortedBy === "relevant" ? "sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={handleSortedBy}
        className={`sorting__button sorting__button--recent ${
          sortedBy === "recent" ? "sorting__button--active" : ""
        } `}
      >
        Recent
      </button>
    </section>
  );
}
