import { jsx as _jsx } from "react/jsx-runtime";
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
export const GenreFilter = ({ selectedGenre, onGenreChange, disabled = false, }) => {
    return (_jsx("select", { value: selectedGenre, onChange: (e) => onGenreChange(e.target.value), disabled: disabled, className: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 bg-white cursor-pointer", children: GENRES.map((genre) => (_jsx("option", { value: genre === "All Genres" ? "" : genre, children: genre }, genre))) }));
};
