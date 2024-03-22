import JobListItem from "./JobListItem";
import { Iresponse } from "./types";

export function JobList({ jobItems, isLoading }: Iresponse) {
  console.log(isLoading);
  // if (isLoading) return <div style={{
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: "100vh",
  
  // }}>loading...</div>

  if(isLoading) return <div className="spinner"></div>
  return (
    <ul className="job-list">
      {jobItems?.map((jobItem) => (
        <JobListItem key={jobItem.id} items={jobItem}  />
      ))}
    </ul>
  );
}

export default JobList;
