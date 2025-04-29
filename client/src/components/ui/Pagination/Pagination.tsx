import { FC, useCallback } from "react";
import classNames from "classnames";
import "./Pagination.scss";
import Button from "../Button/Button";
import IconArrowLeft from "../icons/IconArrowLeft";
import IconArrowRight from "../icons/IconArrowRight";
import { observer } from "mobx-react-lite";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = observer(
  ({ currentPage, totalPages, onPageChange, className }) => {
    const getPageNumbers = useCallback(() => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (totalPages > maxVisible) {
        if (currentPage <= 3) {
          end = maxVisible;
        } else if (currentPage >= totalPages - 2) {
          start = totalPages - maxVisible + 1;
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    }, [currentPage, totalPages]);

    const handlePrevious = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

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
            disabled={currentPage === 1}
            onClick={handlePrevious}
          >
            <span className="visually-hidden">Предыдущая страница</span>
            <IconArrowLeft
              width={16}
              height={16}
              className="pagination__arrow"
            />
          </Button>

          <ul className="pagination__pages" role="list">
            {getPageNumbers().map((page) => (
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
            ))}
          </ul>

          <Button
            className="pagination__button pagination__button--next"
            variant="rounded"
            background="secondary"
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            <span className="visually-hidden">Предыдущая страница</span>
            <IconArrowRight
              width={16}
              height={16}
              className="pagination__arrow"
            />
          </Button>
        </div>
      </div>
    );
  },
);

export default Pagination;
