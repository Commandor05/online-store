export interface PaginationReturn {
  page: number;
  totalPages: number;
  firstIndex: number;
  lastIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}