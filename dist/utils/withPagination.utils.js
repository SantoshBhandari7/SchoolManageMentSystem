"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = async (total_count, perPage, currentPage) => {
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
exports.getPagination = getPagination;
