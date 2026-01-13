const DATA_PER_PAGE = 3;

export const paginationWithoutSkip = (page: number) => {
  const ACTIVE_PAGE = Math.max(1, Math.floor(Number(page) ? Number(page) : 1));

  const TOTAL_DATA = ACTIVE_PAGE * DATA_PER_PAGE;
  return TOTAL_DATA;
};

export const paginationWithSkip = (page?: number) => {
  const ACTIVE_PAGE = Math.max(1, Math.floor(Number(page) ? Number(page) : 1));

  const SKIP_DATA = (ACTIVE_PAGE - 1) * DATA_PER_PAGE;
  return { SKIP_DATA, DATA_PER_PAGE };
};

export const isFinalPage = (page: number, TourItemCount: number) => {
  // const ACTIVE_PAGE = Math.max(1, Math.floor(Number(page) ? Number(page) : 1));

  const lastPage = Math.ceil(TourItemCount / DATA_PER_PAGE);
  return page === lastPage ? true : false;
};
