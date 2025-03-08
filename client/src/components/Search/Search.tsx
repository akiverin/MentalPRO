import { FC, useState, useCallback, useEffect } from "react";
import Input from "@components/ui/Input/Input";
import Button from "@components/ui/Button/Button";
import { useDebounce } from "@/hooks/debounce";
import "./Search.scss";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const Search: FC<SearchProps> = ({
  placeholder = "Поиск...",
  onSearch,
  className = "",
}) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <div className={`search ${className}`}>
      <Input
        fullWidth
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search__input"
      />
      {query && (
        <Button
          background="secondary"
          size="large"
          onClick={handleClear}
          className="search__clear"
        >
          <p className="visually-hidden">Сбросить строку поиска</p>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.28736 14L0 12.7126L5.72874 6.98391L0 1.28736L1.28736 0L7.01609 5.69655L12.7126 0L14 1.28736L8.30345 6.98391L14 12.7126L12.7126 14L7.01609 8.27126L1.28736 14Z"
              fill="black"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default Search;
