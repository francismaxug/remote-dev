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
import { useJobItems, useSingleJob } from "../hooks/useJobItems";
import { useActiveId } from "../hooks/useActiveId";

function App() {
  const { search, setSearch, isLoading, jobItemSliced } = useJobItems();
  const activeId = useActiveId();
 const {isLoadingI,singleJobItem} =  useSingleJob(activeId);
 console.log(singleJobItem)
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
            <ResultsCount />
            <SortingControls />
          </div>
          <JobList jobItems={jobItemSliced} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent singleJob={singleJobItem} isLoading={isLoadingI} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
