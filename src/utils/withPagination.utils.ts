export const getPagination = async (
  total_count: number,
  perPage: number,
  currentPage: number,
) => {
  const totalPage = Math.ceil(total_count / perPage);
  const nextPage = currentPage < totalPage ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    total_count,
    totalPage,
    nextPage,
    prevPage,
    page: currentPage,
    limit: perPage,
  };
};
