import Search from "@components/Search/Search";
import "./Cases.scss";
import { useMemo, useState } from "react";
import Pagination from "@/components/ui/Pagination/Pagination";
import { useAppSelector } from "@/store/hooks";
import { searchFilter } from "@/utils/search";
import CardCase from "@components/CaseCard/CardCase";

interface Case {
  id: number;
  name: string;
  description: string;
  text?: string[];
  image?: string;
  category: string;
  link: string;
}

const Cases = () => {
  const cases = useAppSelector((state) => state.cases.cases);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = useMemo(
    () =>
      searchFilter<Case>(cases, searchQuery, ["name", "description", "text"]),
    [searchQuery, cases]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredCases.length / pageSize),
    [filteredCases, pageSize]
  );

  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCases.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredCases]);

  return (
    <>
      <section className="cases-info">
        <div className="cases-info__wrapper">
          <div className="cases-info__titles">
            <h1 className="cases-info__title">Практики и упражнения</h1>
            <p className="cases-info__subtitle">
              Найди способ побороть свою тревожность.
            </p>
          </div>
          <div className="cases-info__search">
            <p className="cases-info__desc">
              Для того, чтобы прокачать стрессоустойчивость и быть более
              спокойнее в кризисные ситуации необходимо найти свой метод из
              предложенных, чтобы противостоять состоянию тревожности.
            </p>
            <Search onSearch={setSearchQuery} className="cases-info__search" />
          </div>
        </div>
      </section>
      <section className="cases-content">
        <div className="cases-content__wrapper">
          <ul className="cases-content__list">
            {paginatedCases.map((item) => (
              <li key={`case-${item.id}`} className="cases-content__item">
                <CardCase {...item} />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </section>
    </>
  );
};

export default Cases;
