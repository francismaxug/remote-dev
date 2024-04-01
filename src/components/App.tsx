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
import { Toaster } from "react-hot-toast";
import JobListSearch from "./JobListSearch";


function App() {


  return (
    <>
      <Background />

      <Header>
        <div className="header__top">
          <Logo />
          <BookmarksButton />
        </div>
        <SearchForm />
      </Header>
      <Container>
        <Sidebar>
          <div className="sidebar__top">
            <ResultsCount
             
            />
            <SortingControls />
          </div>
          <JobListSearch  />
          
            <PaginationControls
             
            />
          
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
