import { FC } from 'react';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import './Search.scss';
import IconClose from '../ui/icons/IconClose';
import IconSearch from '../ui/icons/IconSearch';

interface SearchProps {
  placeholder?: string;
  value: string;
  onSearch: (query: string) => void;
  handleClear: () => void;
  className?: string;
  onChange: (value: string) => void;
}

const Search: FC<SearchProps> = ({ placeholder = 'Поиск...', onSearch, value, className = '', ...props }) => {
  return (
    <div className={`search ${className}`}>
      <Input
        value={value}
        fullWidth
        type="text"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(value);
          }
        }}
        onChange={(val) => {
          if (typeof val === 'string') {
            props.onChange(val);
          }
        }}
        className="search__input"
      />
      {value && (
        <Button background="secondary" size="large" onClick={() => props.onChange('')} className="search__clear">
          <p className="visually-hidden">Сбросить строку поиска</p>
          <IconClose />
        </Button>
      )}
      <Button size="large" onClick={() => onSearch(value)} className="search__clear">
        <p className="visually-hidden">Найти</p>
        <IconSearch />
      </Button>
    </div>
  );
};

export default Search;
