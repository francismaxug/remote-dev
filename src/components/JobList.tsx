import JobListItem from "./JobListItem";
import { Iresponse } from "./types";

export function JobList({jobItems,isLoading}:Iresponse) {
  return <ul className="job-list">
    {

    }
    {
      jobItems.map(jobItem => <JobListItem key={jobItem.id} items={jobItem} isLoading={isLoading}/>)
    }
  </ul>;
}

export default JobList;
