export const getPagination = async (
  total_count: number,
  perPage: number,
  currentPage: number,
) => {
  const totalpage = Math.ceil(total_count / perPage);
  const nextpage = currentPage < totalpage ? currentPage + 1 : null;
  const prevpgae = currentPage > 1 ? currentPage - 1 : null;

  return {
    total_count,
    totalpage,
    nextpage,
    prevpgae,
    page: currentPage,
    limit: perPage,
  };
};
