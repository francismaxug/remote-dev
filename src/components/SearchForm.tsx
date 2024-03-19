interface SearchForm {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchForm({ search, setSearch }: SearchForm) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={search}
        spellCheck="false"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
