import JobList from './JobList'
import { useJobItemsContext } from '../hooks/useJobItems';

export default function JobListSearch() {
  const { jobItemSliced, isLoadingI } = useJobItemsContext();
  return (
    <JobList jobItems={jobItemSliced} isLoading={isLoadingI} />
  )
}
