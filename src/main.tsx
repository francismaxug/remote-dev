import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarksContext from "./contexts/BookmarksContext.tsx";
import ActiveIdsContext from "./contexts/ActiveIdContext.tsx";
import SearchTextsContext from "./contexts/SerchTextContext.tsx";
import JobItemsContext from "./contexts/JobItemsContext.tsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContext>
        <ActiveIdsContext>
          <SearchTextsContext>
            <JobItemsContext>
              <App />
            </JobItemsContext>
          </SearchTextsContext>
        </ActiveIdsContext>
      </BookmarksContext>
    </QueryClientProvider>
  </React.StrictMode>
);
