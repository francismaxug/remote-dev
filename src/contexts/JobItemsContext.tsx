import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../hooks/useJobItems";
import { resultsPerPage } from "../constants";

type BkMark = {
  slicedNumOfItems: number;
  totalNomOfItems: number;
  sortedBy: "relevant" | "recent";
  handleSortedBy: () => void;
  isLoadingI: boolean;
  jobItemSliced: any[];
  handleChangePage: (direction: "next" | "previous") => void;
  currentPage: number;
  totalPages: number;
};

export const JobItemContext = createContext<BkMark | null>(null);

export default function JobItemsContext({
  children,
}: {
  children: React.ReactNode;
}) {
  //dependencies on other contexts
  const { debounceSearchText } = useSearchTextContext();
  //states
  const [sortedBy, setSortedBy] = useState<"relevant" | "recent">("relevant");
  const { jobItems, isLoadingI } = useSearchQuery(debounceSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  //derived state
  const jobItemSorted = useMemo(
    () =>
      jobItems?.slice().sort((a, b) => {
        if (sortedBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }) || [],
    [jobItems, sortedBy]
  );

  //text-Array
  // const i =  [
  //   {
  //     id: 1123412341634563,
  //     title: 'Front End React Engineer',
  //     badgeLetters: '9T',
  //     company: '9th Tech',
  //     relevanceScore: 2999,
  //     daysAgo: 2
  //   },
  //   {
  //     id: 5553645680007895,
  //     title: 'Frontend Developer - React',
  //     badgeLetters: 'AS',
  //     company: 'AT Security',
  //     relevanceScore: 2998,
  //     daysAgo: 4
  //   },
  //   {
  //     id: 11312545454587,
  //     title: 'Junior Software Developer',
  //     badgeLetters: 'AT',
  //     company: 'Aspen Tech',
  //     relevanceScore: 2997,
  //     daysAgo: 4
  //   }]
  const jobItemSliced = useMemo(
    () =>
      jobItemSorted.slice(
        currentPage * resultsPerPage - resultsPerPage,
        currentPage * resultsPerPage
      ) || [],
    [jobItemSorted, currentPage]
  );
  console.log(jobItemSliced);
  /*
  this also works perfectly
    const jobItemSliced =
      jobItems
        ?.slice()
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(
          currentPage * resultsPerPage - resultsPerPage,
          currentPage * resultsPerPage
        ) || [];
    let sort = jobItemSliced;
    if (sortedBy === "recent") {
      sort =
        jobItems
          ?.slice()
          .sort((a, b) => a.daysAgo - b.daysAgo)
          .slice(
            currentPage * resultsPerPage - resultsPerPage,
            currentPage * resultsPerPage
          ) || [];
    }
    */

  const totalNomOfItems = jobItems?.length || 0;
  const slicedNumOfItems =
    jobItemSliced.length > 1
      ? jobItemSliced.length + currentPage * resultsPerPage - resultsPerPage
      : jobItemSliced.length;
  const totalPages = Math.ceil(totalNomOfItems / resultsPerPage);
  //event handlers / actions
  const handleChangePage = useCallback((direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  },[currentPage]);

  const handleSortedBy = useCallback(() => {
    setSortedBy((prev) => (prev === "recent" ? "relevant" : "recent"));
    setCurrentPage(1);
  },[]);

  if (jobItems?.length === undefined && currentPage !== 1) {
    setCurrentPage(1);
  }

  const contextValue = useMemo(
    () => ({
      slicedNumOfItems,
      totalNomOfItems,
      sortedBy,
      handleSortedBy,
      isLoadingI,
      jobItemSliced,
      handleChangePage,
      currentPage,
      totalPages,
    }),
    [
      slicedNumOfItems,
      totalNomOfItems,
      sortedBy,
      handleSortedBy,
      isLoadingI,
      jobItemSliced,
      handleChangePage,
      currentPage,
      totalPages,
    ]
  );

  return (
    <JobItemContext.Provider value={contextValue}>
      {children}
    </JobItemContext.Provider>
  );
}
