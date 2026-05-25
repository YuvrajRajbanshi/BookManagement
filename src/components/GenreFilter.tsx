import React from "react";

const GENRES = [
  "All Genres",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Biography",
  "History",
];

interface GenreFilterProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  disabled?: boolean;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenre,
  onGenreChange,
  disabled = false,
}) => {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => onGenreChange(e.target.value)}
      disabled={disabled}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 bg-white cursor-pointer"
    >
      {GENRES.map((genre) => (
        <option key={genre} value={genre === "All Genres" ? "" : genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};
