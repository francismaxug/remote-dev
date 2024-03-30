import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import {
  useDebounceSerach,
  useSearchQuery,
  useSingleJob,
} from "../hooks/useJobItems";
import { useActiveId } from "../hooks/useActiveId";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { resultsPerPage } from "../constants";

function App() {
  //states
  const [search, setSearch] = useState("");
  const [sortedBy, setSortedBy] = useState<"relevant" | "recent">("relevant");
  const debounceSearchText = useDebounceSerach(search);
  const { jobItems, isLoadingI } = useSearchQuery(debounceSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const activeId = useActiveId();
  const { isLoading, singleJobItem } = useSingleJob(activeId);

  //derived state
  const jobItemSorted =
    jobItems?.slice().sort((a, b) => {
      if (sortedBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    }) || [];

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
  const jobItemSliced =
    jobItemSorted.slice(
      currentPage * resultsPerPage - resultsPerPage,
      currentPage * resultsPerPage
    ) || [];
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
  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortedBy = () => {
    setSortedBy((prev) => (prev === "recent" ? "relevant" : "recent"));
    setCurrentPage(1);
  };

  if (jobItems?.length === undefined && currentPage !== 1) {
    setCurrentPage(1);
  }

  return (
    <>
      <Background />
      <Header>
        <div className="header__top">
          <Logo />
          <BookmarksButton />
        </div>
        <SearchForm search={search} setSearch={setSearch} />
      </Header>
      <Container>
        <Sidebar>
          <div className="sidebar__top">
            <ResultsCount
              jobItemSliced={slicedNumOfItems}
              totalNomOfItems={totalNomOfItems}
            />
            <SortingControls sortedby={sortedBy} handlesort={handleSortedBy} />
          </div>
          <JobList jobItems={jobItemSliced} isLoading={isLoadingI} />
          {totalNomOfItems > 0 && (
            <PaginationControls
              onClick={handleChangePage}
              currentpage={currentPage}
              totalPages={totalPages}
            />
          )}
        </Sidebar>
        <JobItemContent
          singleJob={singleJobItem || null}
          isLoading={isLoading}
        />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
