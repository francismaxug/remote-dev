import { useState, useEffect } from "react";
import { Iobj, SingleJob } from "../components/types";

const BaseUrl = "https://bytegrad.com/course-assets/projects/rmtdev/api/data";
export function useJobItems() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobItems, setJobItems] = useState<Iobj[]>([] as Iobj[]);

  const jobItemSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!search) return;

    async function getData(): Promise<void> {
      setIsLoading(true);
      try {
        const res = await fetch(`${BaseUrl}?search=${search}`);
        const data = await res.json();
        const { jobItems } = data;
        setIsLoading(false);
        setJobItems(jobItems);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    getData();
    console.log("fetching data...");
  }, [search]);

  return { search, setSearch, jobItemSliced, isLoading } as const;
}

export function useSingleJob(activeId: number | null) {
  const [singleJobItem, setSingleJobItem] = useState<SingleJob | null>(null);
  const [isLoadingI, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeId) return;
    async function fetchSingle() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data/${activeId}`
        );
        const data = await res.json();
        setIsLoading(false);
        setSingleJobItem(data.jobItem);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchSingle();
  }, [activeId]);
  return {isLoadingI,singleJobItem};
}
