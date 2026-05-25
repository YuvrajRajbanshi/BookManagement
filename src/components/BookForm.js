import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "./Button";
const GENRES = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Biography",
    "History",
];
export const BookForm = ({ book, onSubmit, onCancel, isLoading = false, }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        publicationYear: new Date().getFullYear(),
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                genre: book.genre,
                publicationYear: book.publicationYear,
            });
        }
    }, [book]);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!formData.author.trim()) {
            newErrors.author = "Author is required";
        }
        if (!formData.genre) {
            newErrors.genre = "Genre is required";
        }
        if (!formData.publicationYear ||
            formData.publicationYear < 1000 ||
            formData.publicationYear > new Date().getFullYear() + 1) {
            newErrors.publicationYear = "Please enter a valid year";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "publicationYear" ? parseInt(value) : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm())
            return;
        try {
            await onSubmit(formData);
        }
        catch (error) {
            console.error("Form submission error:", error);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-900 mb-1", children: "Book Title *" }), _jsx("input", { id: "title", type: "text", name: "title", value: formData.title, onChange: handleChange, disabled: isLoading, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600", placeholder: "Enter book title" }), errors.title && (_jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.title }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "author", className: "block text-sm font-medium text-gray-900 mb-1", children: "Author *" }), _jsx("input", { id: "author", type: "text", name: "author", value: formData.author, onChange: handleChange, disabled: isLoading, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600", placeholder: "Enter author name" }), errors.author && (_jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.author }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "genre", className: "block text-sm font-medium text-gray-900 mb-1", children: "Genre *" }), _jsxs("select", { id: "genre", name: "genre", value: formData.genre, onChange: handleChange, disabled: isLoading, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600", children: [_jsx("option", { value: "", children: "Select a genre" }), GENRES.map((genre) => (_jsx("option", { value: genre, children: genre }, genre)))] }), errors.genre && (_jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.genre }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "publicationYear", className: "block text-sm font-medium text-gray-900 mb-1", children: "Publication Year *" }), _jsx("input", { id: "publicationYear", type: "number", name: "publicationYear", value: formData.publicationYear, onChange: handleChange, disabled: isLoading, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600", placeholder: "Enter publication year", min: "1000", max: new Date().getFullYear() + 1 }), errors.publicationYear && (_jsx("p", { className: "text-red-600 text-sm mt-1", children: errors.publicationYear }))] }), _jsxs("div", { className: "flex gap-3 pt-6 border-t border-gray-200", children: [_jsx(Button, { type: "button", variant: "secondary", onClick: onCancel, disabled: isLoading, className: "flex-1", children: "Cancel" }), _jsx(Button, { type: "submit", variant: "primary", isLoading: isLoading, className: "flex-1", children: book ? "Update Book" : "Add Book" })] })] }));
};
