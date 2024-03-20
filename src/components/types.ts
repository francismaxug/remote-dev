export interface Iobj {
  badgeLetters: string;
  company: string;
  daysAgo: number;
  id: number;
  relevanceScore: number;
  title: string;
}

export interface ISearchForm {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export interface Iresponse {
  jobItems: Iobj[];
  isLoading: boolean;
}

export interface SingleJob extends Iobj{
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
}


export interface IuseJobItems {
  public: boolean
  jobItem:SingleJob
}