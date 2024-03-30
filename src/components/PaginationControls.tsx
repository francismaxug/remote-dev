import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function PaginationControls({
  onClick,
  currentpage,
  totalPages,
}: {
  onClick: (direction: "next" | "previous") => void;
  currentpage: number;
  totalPages: number;
}) {
  return (
    <section className="pagination">
      {currentpage > 1 && (
        <PaginationBtn
          onClick={() => onClick("previous")}
          direction="previous"
          currentpage={currentpage}
        />
      )}

      {currentpage < totalPages && ( <PaginationBtn
        onClick={() => onClick("next")}
        direction="next"
        currentpage={currentpage}
      />)}
     
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
      onClick={(e)=>{
        onClick();
        e.currentTarget.blur()}
      }
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
