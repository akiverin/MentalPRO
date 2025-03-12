import { FC, useMemo } from "react";
import classNames from "classnames";
import "./Pagination.scss";
import Button from "../Button/Button";
import Select from "../Select/Select";

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

  return (
    <div className={classNames("pagination-container", className)}>
      <div className="pagination">
        <Button
          className="pagination__button pagination__button--prev"
          variant="rounded"
          background="secondary"
          disabled={isPrevDisabled}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label={labels.prevPage}
        >
          <span className="visually-hidden">{labels.prevPage}</span>
          <svg
            className="pagination__arrow"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            aria-hidden="true"
          >
            <path
              d="M6.58381 13.5065L0.123047 7.04572L6.58381 0.584961L7.83026 1.81756L3.50231 6.14551H14.3741V7.94593H3.50231L7.83026 12.267L6.58381 13.5065Z"
              fill="currentColor"
            />
          </svg>
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
                  onClick={() => onPageChange(page as number)}
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
          onClick={() => onPageChange(currentPage + 1)}
          aria-label={labels.nextPage}
        >
          <span className="visually-hidden">{labels.nextPage}</span>
          <svg
            className="pagination__arrow"
            width="16"
            height="15"
            viewBox="0 0 16 15"
            aria-hidden="true"
          >
            <path
              d="M8.65626 14.6023L7.2911 13.2523L12.0312 8.51221H0.124023V6.54032H12.0312L7.2911 1.80777L8.65626 0.450195L15.7323 7.52627L8.65626 14.6023Z"
              fill="currentColor"
            />
          </svg>
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
