import { useCallback, useEffect, useState } from "react";
import Search from "@components/Search/Search";
import "./Cases.scss";
import Pagination from "@/components/ui/Pagination/Pagination";
import CardCase from "@components/CaseCard/CardCase";
import { practiceListStore } from "@entities/practice/stores/practiceStoreInstance";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PracticeModel } from "@/entities/practice/model";

const Cases = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    setLocalSearch(search);
    practiceListStore.setSearchQuery(search);
    practiceListStore.fetchPractices(page);
  }, [searchParams]);

  const onSearch = useCallback(() => {
    setSearchParams({
      search: localSearch,
      page: "1",
    });
  }, [localSearch, setSearchParams]);

  const onPageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        prev.set("page", String(page));
        return new URLSearchParams(prev);
      });
    },
    [setSearchParams],
  );

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
            <Search
              value={localSearch}
              onSearch={onSearch}
              handleClear={() => {
                setLocalSearch("");
                setSearchParams({ search: "", page: "1" });
              }}
              onChange={(value) => {
                setLocalSearch(value);
              }}
              className="cases-info__search"
            />
          </div>
        </div>
      </section>
      <section className="cases-content">
        <div className="cases-content__wrapper">
          <ul className="cases-content__list">
            {practiceListStore.practices.map((item: PracticeModel) => (
              <li key={`case-${item.id}`} className="cases-content__item">
                <CardCase
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={practiceListStore.pagination.page}
            totalPages={practiceListStore.pagination.pageCount}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </>
  );
});

export default Cases;
