import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../hooks/useJobItems";

export default function PaginationControls() {
  const { currentPage, totalNomOfItems, totalPages, handleChangePage } =
    useJobItemsContext();

  if (totalNomOfItems === 0) return null;
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationBtn
          onClick={() => handleChangePage("previous")}
          direction="previous"
          currentpage={currentPage}
        />
      )}

      {currentPage < totalPages && (
        <PaginationBtn
          onClick={() => handleChangePage("next")}
          direction="next"
          currentpage={currentPage}
        />
      )}
    </section>
  );
}

function PaginationBtn({
  direction,
  currentpage,
  onClick,
}: {
  direction: "next" | "previous";
  currentpage: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction} `}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon /> Page {currentpage - 1}
        </>
      )}

      {direction === "next" && (
        <>
          Page {currentpage + 1} <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
