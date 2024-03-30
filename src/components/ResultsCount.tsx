export default function ResultsCount({
  totalNomOfItems,
  jobItemSliced,
}: {
  totalNomOfItems: number;
  jobItemSliced: number;
}) {
  return (
    <p className="count">
      <span className="u-bold">{jobItemSliced}/{totalNomOfItems}</span> results
    </p>
  );
}
