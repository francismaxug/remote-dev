export default function SortingControls({
  sortedby,
  handlesort,
}: {
  sortedby: string;
  handlesort: () => void;
}) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={handlesort}
        className={`sorting__button sorting__button--relevant ${
          sortedby === "relevant" ? "sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={handlesort}
        className={`sorting__button sorting__button--recent ${
          sortedby === "recent" ? "sorting__button--active" : ""
        } `}
      >
        Recent
      </button>
    </section>
  );
}
