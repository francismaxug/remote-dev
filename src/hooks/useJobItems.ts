import { useState, useEffect } from "react";
import { IuseFetchJob, IuseJobItems } from "../components/types";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
export function useJobItems(search: string) {
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
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  const jobItems = data?.jobItems;
  const isLoadingI = isInitialLoading;
  console.log(isLoadingI);
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
      onError: (error) => {
        console.log(error);
      },
    }
  );
  console.log(data);
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
