import React from "react";
import { Button } from "@material-ui/core";

function PaginationButtons({ currentPage, totalPage, handlePageChange }) {
  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = currentPage <= 3 ? 1 : currentPage - 2;
    const endPage = Math.min(startPage + 4, totalPage);

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          disabled={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return pageButtons;
  };

  const handlePreviousPage = () => {
    const previousPage = Math.max(currentPage - 5, 1);
    handlePageChange(previousPage);
  };

  const handleNextPage = () => {
    const nextPage = Math.min(currentPage + 5, 73); // 전체 페이지 수가 40 페이지로 가정
    handlePageChange(nextPage);
  };

  return (
    <div>
      <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
        이전
      </Button>
      {renderPageButtons()}
      <Button disabled={currentPage === totalPage} onClick={handleNextPage}>
        다음
      </Button>
    </div>
  );
}

export default PaginationButtons;
