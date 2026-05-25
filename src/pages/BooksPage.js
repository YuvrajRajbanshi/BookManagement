import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { BookCard, BookForm, Button, DeleteConfirmation, EmptyState, ErrorAlert, GenreFilter, BookCardSkeleton, Modal, SearchBar, } from "../components";
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook, useSearchBooks, useFilterBooks, } from "../hooks/useBooks";
export const BooksPage = () => {
    const { data: allBooks, loading: loadingBooks, error: booksError, fetchBooks, } = useBooks();
    const { create, loading: creatingBook, error: createError } = useCreateBook();
    const { update, loading: updatingBook, error: updateError } = useUpdateBook();
    const { delete: deleteBook, loading: deletingBook, error: deleteError, } = useDeleteBook();
    const { results: searchResults, search, loading: searchingBooks, } = useSearchBooks();
    const { results: filteredResults, filter, loading: filteringBooks, } = useFilterBooks();
    const [state, setState] = useState({
        formMode: null,
        selectedBook: null,
        deleteConfirmation: { isOpen: false, book: null },
        error: null,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);
    const displayedBooks = searchQuery
        ? searchResults
        : selectedGenre
            ? filteredResults
            : allBooks || [];
    const isLoading = loadingBooks || searchingBooks || filteringBooks;
    const handleSearch = useCallback(async (query) => {
        setSearchQuery(query);
        setSelectedGenre("");
        if (query.trim()) {
            await search(query);
        }
    }, [search]);
    const handleGenreChange = useCallback(async (genre) => {
        setSelectedGenre(genre);
        setSearchQuery("");
        if (genre) {
            await filter(genre);
        }
    }, [filter]);
    const handleOpenForm = (mode, book) => {
        setState((prev) => ({
            ...prev,
            formMode: mode,
            selectedBook: book || null,
            error: null,
        }));
    };
    const handleCloseForm = () => {
        setState((prev) => ({
            ...prev,
            formMode: null,
            selectedBook: null,
            error: null,
        }));
    };
    const handleFormSubmit = async (data) => {
        try {
            if (state.formMode === "add") {
                await create(data);
            }
            else if (state.formMode === "edit" && state.selectedBook) {
                const bookId = state.selectedBook.id;
                console.log("Updating book ID:", bookId, "Book:", state.selectedBook);
                await update(bookId, data);
            }
            await fetchBooks();
            handleCloseForm();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "An error occurred";
            setState((prev) => ({
                ...prev,
                error: message,
            }));
        }
    };
    const handleDeleteClick = (book) => {
        setState((prev) => ({
            ...prev,
            deleteConfirmation: { isOpen: true, book },
        }));
    };
    const handleConfirmDelete = async () => {
        if (!state.deleteConfirmation.book)
            return;
        try {
            const bookId = state.deleteConfirmation.book.id;
            console.log("Confirming delete for book ID:", bookId, "Book:", state.deleteConfirmation.book);
            await deleteBook(bookId);
            await fetchBooks();
            setState((prev) => ({
                ...prev,
                deleteConfirmation: { isOpen: false, book: null },
            }));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Failed to delete book";
            setState((prev) => ({
                ...prev,
                error: message,
                deleteConfirmation: { isOpen: false, book: null },
            }));
        }
    };
    const handleCancelDelete = () => {
        setState((prev) => ({
            ...prev,
            deleteConfirmation: { isOpen: false, book: null },
        }));
    };
    const errorMessage = state.error ||
        booksError?.message ||
        createError?.message ||
        updateError?.message ||
        deleteError?.message;
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Book Management" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage your book collection" })] }), errorMessage && (_jsx(ErrorAlert, { message: errorMessage, onDismiss: () => setState((prev) => ({ ...prev, error: null })) })), _jsx("div", { className: "bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-6", children: _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx(Button, { variant: "primary", onClick: () => handleOpenForm("add"), disabled: state.formMode !== null, children: "+ Add Book" }), _jsxs("div", { className: "text-sm text-gray-600", children: [displayedBooks.length, " book", displayedBooks.length !== 1 ? "s" : ""] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [_jsx("div", { className: "sm:col-span-2", children: _jsx(SearchBar, { onSearch: handleSearch, disabled: state.formMode !== null, placeholder: "Search by title or author..." }) }), _jsx(GenreFilter, { selectedGenre: selectedGenre, onGenreChange: handleGenreChange, disabled: state.formMode !== null })] })] }) }), isLoading ? (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [...Array(6)].map((_, i) => (_jsx(BookCardSkeleton, {}, i))) })) : displayedBooks.length === 0 ? (_jsx(EmptyState, { title: searchQuery ? "No books found" : "No books yet", description: searchQuery
                            ? "Try a different search term"
                            : "Start by adding your first book" })) : (_jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: displayedBooks.map((book) => (_jsx(BookCard, { book: book, onEdit: () => handleOpenForm("edit", book), onDelete: handleDeleteClick, isDeleting: deletingBook && state.deleteConfirmation.book?.id === book.id }, book.id))) }))] }), _jsx(Modal, { isOpen: state.formMode !== null, onClose: handleCloseForm, title: state.formMode === "add" ? "Add New Book" : "Edit Book", children: _jsx(BookForm, { book: state.selectedBook || undefined, onSubmit: handleFormSubmit, onCancel: handleCloseForm, isLoading: creatingBook || updatingBook }) }), state.deleteConfirmation.isOpen && state.deleteConfirmation.book && (_jsx(DeleteConfirmation, { bookTitle: state.deleteConfirmation.book.title, onConfirm: handleConfirmDelete, onCancel: handleCancelDelete, isLoading: deletingBook }))] }));
};
