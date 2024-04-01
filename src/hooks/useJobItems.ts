import { useState, useEffect, useContext } from "react";
import { IuseFetchJob, IuseJobItems, SingleJob } from "../components/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "../utils";
import { BookMrksCon } from "../contexts/BookmarksContext";
import { ActiveIdContext } from "../contexts/ActiveIdContext";
import { SearchTextContext } from "../contexts/SerchTextContext";
import { JobItemContext } from "../contexts/JobItemsContext";

const BaseUrl = "https://bytegrad.com/course-assets/projects/rmtdev/api/data";
// export function useJobItems(search: string) {
//   const [isLoadingI, setIsLoading] = useState(false);
//   const [jobItems, setJobItems] = useState<Iobj[]>([] as Iobj[]);
//react Query

//   useEffect(() => {
//     if (!search) return;

//     async function getData(): Promise<void> {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`${BaseUrl}?search=${search}`);
//         const data = await res.json();
//         const { jobItems } = data;
//         setIsLoading(false);
//         setJobItems(jobItems);
//       } catch (error) {
//         console.log(error);
//         setIsLoading(false);
//       }
//     }

//     getData();
//     console.log("fetching data...");
//   }, [search]);

//   return { jobItems, isLoadingI } as const;
// }

//we will use react-query for the above

const secondFetch = async (search: string): Promise<IuseFetchJob> => {
  console.log("fetching data...");

  const res = await fetch(`${BaseUrl}?search=${search}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description || "Something went wrong!");
  }
  const data = await res.json();
  console.log(data);
  return data;
};
export function useSearchQuery(search: string) {
  // const [isLoadingI, setIsLoading] = useState(false);
  // const [jobItems, setJobItems] = useState<Iobj[]>([] as Iobj[]);
  const { data, isInitialLoading } = useQuery(
    ["s-search", search],
    () => secondFetch(search),
    {
      enabled: !!search,
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );
  const jobItems = data?.jobItems;
  const isLoadingI = isInitialLoading;
  return { jobItems, isLoadingI } as const;
}

// export function useSingleJob(activeId: number | null) {
//   const [singleJobItem, setSingleJobItem] = useState<SingleJob | null>(null);
//   const [isLoadingI, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!activeId) return;
//     async function fetchSingle() {
//       try {
//         setIsLoading(true);
//         const res = await fetch(
//           `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${activeId}`
//         );
//         const data = await res.json();
//         setIsLoading(false);
//         setSingleJobItem(data.jobItem);
//       } catch (error) {
//         console.log(error);
//         setIsLoading(false);
//       }
//     }

//     fetchSingle();
//   }, [activeId]);
//   return { isLoadingI, singleJobItem };
// }

//we will use react-query for the above

const fetchFxn = async (activeId: number): Promise<IuseJobItems> => {
  const res = await fetch(
    `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${activeId}`
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description || "Something went wrong!");
  }
  const data = await res.json();
  return data;
};
export function useSingleJob(activeId: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", activeId],
    () => (activeId ? fetchFxn(activeId) : null),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!activeId, //or Boolean(activeId)
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }
  );
  const singleJobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { singleJobItem, isLoading } as const;
}

export function useDebounceSerach<T>(value: T, delay = 500): T {
  const [debounceSearchText, setDebounceSearchText] = useState(value);
  useEffect(() => {
    const tt = setTimeout(() => {
      setDebounceSearchText(value);
    }, delay);
    return () => clearTimeout(tt);
  }, [value, delay]);

  return debounceSearchText;
}
//-----------------------------------------------------

export function useJobItems(ids: number[]) {
  const data = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchFxn(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    })),
  });
  const isLoadingI = data.some((d) => d.isLoading);
  console.log(data);
  const jobItems = data
    .map((d) => d.data?.jobItem)
    // .filter((p) => !!p) as SingleJob[];//this works same as below
    .filter((p) => Boolean(p)) as SingleJob[];
  return { jobItems, isLoadingI } as const;
}

//=====================================

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  console.log("useOnClickOutside");
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(event.target as Node))
      ) {
        handler();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [refs, handler]);
}

//-----------------------------------------------------
export function useBokkmark() {
  const context = useContext(BookMrksCon);
  if (!context)
    throw new Error("You have called the contextin the wrong place");
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context)
    throw new Error("You have called the contextin the wrong place");
  return context;
}
export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context)
    throw new Error("You have called the context at the wrong place");
  return context;
}

export function useJobItemsContext() {
  const context = useContext(JobItemContext);
  if (!context)
    throw new Error("You have called the contextin the wrong place");
  return context;
}
