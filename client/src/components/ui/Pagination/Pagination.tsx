import { FC, useMemo } from "react";
import classNames from "classnames";
import "./Pagination.scss";
import Button from "../Button/Button";
import Select from "../Select/Select";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconArrowRight from "../icons/IconArrowRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
  labels?: {
    prevPage?: string;
    nextPage?: string;
    perPage?: string;
  };
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [4, 6, 8, 10],
  onPageChange,
  onPageSizeChange,
  className = "",
  labels = {
    prevPage: "Предыдущая страница",
    nextPage: "Следующая страница",
    perPage: "на странице",
  },
}) => {
  const isPrevDisabled = useMemo(() => currentPage <= 1, [currentPage]);
  const isNextDisabled = useMemo(
    () => currentPage >= totalPages || totalPages === 0,
    [currentPage, totalPages]
  );

  const pageNumbers = useMemo(() => {
    if (totalPages <= 0) return [];
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageSizeChange = (selectedOption: {
    label: string;
    value: number | string;
  }) => {
    if (onPageSizeChange) {
      const newSize = Number(selectedOption.value);
      onPageSizeChange(newSize);
      const newTotalPages = Math.ceil((totalPages * pageSize) / newSize);
      if (currentPage > newTotalPages) {
        onPageChange(1);
      }
    }
  };

  if (totalPages <= 0) {
    return null;
  }

  const handlePageChange = (page: number) => {
    onPageChange(page);
    document.documentElement.scrollTo(0, 0);
  };

  return (
    <div className={classNames("pagination-container", className)}>
      <div className="pagination">
        <Button
          className="pagination__button pagination__button--prev"
          variant="rounded"
          background="secondary"
          disabled={isPrevDisabled}
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label={labels.prevPage}
        >
          <span className="visually-hidden">{labels.prevPage}</span>
          <IconArrowLeft width={16} height={16} className="pagination__arrow" />
        </Button>

        <ul className="pagination__pages" role="list">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <li key={`ellipsis-${index}`} className="pagination__ellipsis">
                <span aria-hidden="true">…</span>
              </li>
            ) : (
              <li key={`page-${page}`} className="pagination__page">
                <Button
                  variant="rounded"
                  fullWidth
                  background={currentPage === page ? "light" : "secondary"}
                  className={classNames("pagination__page-button", {
                    "pagination__page-button--active": currentPage === page,
                  })}
                  onClick={() => handlePageChange(page as number)}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Страница ${page}`}
                >
                  {page}
                </Button>
              </li>
            )
          )}
        </ul>

        <Button
          className="pagination__button pagination__button--next"
          variant="rounded"
          background="secondary"
          disabled={isNextDisabled}
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label={labels.nextPage}
        >
          <span className="visually-hidden">{labels.nextPage}</span>
          <IconArrowRight
            width={16}
            height={16}
            className="pagination__arrow"
          />
        </Button>
      </div>

      {onPageSizeChange && (
        <div className="pagination__size-selector">
          <Select
            defaultValue={pageSize}
            options={pageSizeOptions.map((item) => ({
              label: `${item} ${labels.perPage}`,
              value: item,
            }))}
            onChange={handlePageSizeChange}
            className="pagination__select"
            aria-label="Выбор количества элементов на странице"
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
