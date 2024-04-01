import { useJobItemsContext } from "../hooks/useJobItems";

export default function ResultsCount() {
  const { jobItemSliced, totalNomOfItems } = useJobItemsContext();
  console.log(totalNomOfItems);
  console.log(jobItemSliced);
  return (
    <p className="count">
      <span className="u-bold">
        {jobItemSliced.length}/{totalNomOfItems}
      </span>{" "}
      results
    </p>
  );
}
