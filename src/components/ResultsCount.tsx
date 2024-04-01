import { useJobItemsContext } from "../hooks/useJobItems";

export default function ResultsCount() {
  const { jobItemSliced, totalNomOfItems } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{jobItemSliced}/{totalNomOfItems}</span> results
    </p>
  );
}
