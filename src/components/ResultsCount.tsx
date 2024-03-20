export default function ResultsCount({
  totalNomOfItems,
}: {
  totalNomOfItems: number;
}) {
  return (
    <p className="count">
      <span className="u-bold">{totalNomOfItems}</span> results
    </p>
  );
}
