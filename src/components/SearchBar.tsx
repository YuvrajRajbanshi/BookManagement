import React, { useState, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  disabled = false,
  placeholder = "Search by title or author...",
}) => {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    },
    [onSearch],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
