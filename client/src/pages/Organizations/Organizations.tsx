import Search from "@components/Search/Search";
import "./Organizations.scss";
import Badge from "@components/ui/Badge/Badge";
import CardOrganization from "./CardOrganization/CardOrganization";
import Pagination from "@/components/ui/Pagination/Pagination";
import { useAppSelector } from "@/store/hooks";
import { searchFilter } from "@/utils/search";
import Organization from "@/types/organizations";
import { useMemo, useState } from "react";

const Organizations = () => {
  const organizations = useAppSelector(
    (state) => state.organizations.organizations
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = useMemo(
    () =>
      searchFilter<Organization>(organizations, searchQuery, [
        "name",
        "description",
      ]),
    [searchQuery, organizations]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredCases.length / pageSize),
    [filteredCases, pageSize]
  );

  const paginatedOrganizations = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCases.slice(start, start + pageSize);
  }, [currentPage, pageSize, filteredCases]);
  return (
    <>
      <section className="organizations-info">
        <div className="organizations-info__wrapper">
          <div className="organizations-info__titles">
            <h1 className="organizations-info__title">Организации</h1>
            <p className="organizations-info__subtitle">
              Список компаний, которые мониторит ментальное здоровье сотрудников
              с помощью MentalPRO.
            </p>
          </div>
          <div className="organizations-info__extra">
            <Badge variant="small">Вы не подключены к организации</Badge>
            <Search
              onSearch={setSearchQuery}
              className="organizations-info__search"
            />
          </div>
        </div>
      </section>
      <section className="organizations-content">
        <div className="organizations-content__wrapper">
          <ul className="organizations-content__list">
            {paginatedOrganizations.map((item) => (
              <li
                key={`organization-${item.id}`}
                className="organizations-content__item"
              >
                <CardOrganization {...item} />
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

export default Organizations;
