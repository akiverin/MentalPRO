import { FC, useMemo } from "react";
import classNames from "classnames";
import "./Pagination.scss";
import Button from "../Button/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [4, 6, 8, 10],
  onPageChange,
  onPageSizeChange,
  className = "",
}) => {
  const isPrevDisabled = useMemo(() => currentPage === 1, [currentPage]);
  const isNextDisabled = useMemo(
    () => currentPage === totalPages,
    [currentPage, totalPages]
  );

  return (
    <>
      <div className={classNames("pagination", className)}>
        <Button
          className="pagination__button pagination__button--prev"
          variant="rounded"
          background="secondary"
          disabled={isPrevDisabled}
          onClick={() => onPageChange(currentPage - 1)}
          aria-disabled={isPrevDisabled}
        >
          <p className="visually-hidden">Предыдущая страница</p>
          <svg
            className="pagination__arrow"
            width="15"
            height="14"
            viewBox="0 0 15 14"
          >
            <path
              d="M6.58381 13.5065L0.123047 7.04572L6.58381 0.584961L7.83026 1.81756L3.50231 6.14551H14.3741V7.94593H3.50231L7.83026 12.267L6.58381 13.5065Z"
              fill="black"
            />
          </svg>
        </Button>

        <span className="pagination__info">
          {currentPage} из {totalPages}
        </span>

        <Button
          className="pagination__button pagination__button--next"
          variant="rounded"
          background="secondary"
          disabled={isNextDisabled}
          onClick={() => onPageChange(currentPage + 1)}
          aria-disabled={isNextDisabled}
        >
          <p className="visually-hidden">Следующая страница</p>
          <svg
            className="pagination__arrow"
            width="16"
            height="15"
            viewBox="0 0 16 15"
          >
            <path
              d="M8.65626 14.6023L7.2911 13.2523L12.0312 8.51221H0.124023V6.54032H12.0312L7.2911 1.80777L8.65626 0.450195L15.7323 7.52627L8.65626 14.6023Z"
              fill="black"
            />
          </svg>
        </Button>
      </div>

      {onPageSizeChange && (
        <select
          className="select"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            if (currentPage >= totalPages) onPageChange(1);
          }}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} на странице
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default Pagination;
