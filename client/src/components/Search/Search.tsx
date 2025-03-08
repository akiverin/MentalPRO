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
          ✕
        </Button>
      )}
    </div>
  );
};

export default Search;
