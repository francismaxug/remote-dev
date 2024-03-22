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
  useJobItems,
  useSingleJob,
} from "../hooks/useJobItems";
import { useActiveId } from "../hooks/useActiveId";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [search, setSearch] = useState("");
  const debounceSearchText = useDebounceSerach(search);
  const { jobItems, isLoadingI } = useJobItems(debounceSearchText);
  const activeId = useActiveId();
  const jobItemSliced = jobItems?.slice(0, 7) || [];
  const totalNomOfItems = jobItems?.length || 0;
  const { isLoading, singleJobItem } = useSingleJob(activeId);
  console.log(singleJobItem);
  console.log(jobItems);
  console.log(isLoadingI);
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
            <ResultsCount totalNomOfItems={totalNomOfItems} />
            <SortingControls />
          </div>
          <JobList jobItems={jobItemSliced} isLoading={isLoadingI} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent
          singleJob={singleJobItem || null}
          isLoading={isLoading}
        />
      </Container>
      <Footer />
      <Toaster position="top-right"/>
    </>
  );
}

export default App;
