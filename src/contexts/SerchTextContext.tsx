import { createContext, useState } from "react";
import { useDebounceSerach } from "../hooks/useJobItems";

type BkMark = {
  search: string;
  debounceSearchText: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchTextContext = createContext<BkMark | null>(null);

export default function SearchTextsContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const debounceSearchText = useDebounceSerach(search);
  return (
    <SearchTextContext.Provider
      value={{
        search,
        debounceSearchText,
        setSearch,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
