import React, { useState, useEffect, useCallback } from "react";
import { Book, BookFormData } from "../types";
import {
  BookCard,
  BookForm,
  Button,
  DeleteConfirmation,
  EmptyState,
  ErrorAlert,
  GenreFilter,
  BookCardSkeleton,
  Modal,
  SearchBar,
} from "../components";
import {
  useBooks,
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
  useSearchBooks,
  useFilterBooks,
} from "../hooks/useBooks";

type FormMode = "add" | "edit" | null;

interface BooksPageState {
  formMode: FormMode;
  selectedBook: Book | null;
  deleteConfirmation: { isOpen: boolean; book: Book | null };
  error: string | null;
}

export const BooksPage: React.FC = () => {
  const {
    data: allBooks,
    loading: loadingBooks,
    error: booksError,
    fetchBooks,
  } = useBooks();
  const { create, loading: creatingBook, error: createError } = useCreateBook();
  const { update, loading: updatingBook, error: updateError } = useUpdateBook();
  const {
    delete: deleteBook,
    loading: deletingBook,
    error: deleteError,
  } = useDeleteBook();
  const {
    results: searchResults,
    search,
    loading: searchingBooks,
  } = useSearchBooks();
  const {
    results: filteredResults,
    filter,
    loading: filteringBooks,
  } = useFilterBooks();

  const [state, setState] = useState<BooksPageState>({
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

  const handleSearch = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      setSelectedGenre("");
      if (query.trim()) {
        await search(query);
      }
    },
    [search],
  );

  const handleGenreChange = useCallback(
    async (genre: string) => {
      setSelectedGenre(genre);
      setSearchQuery("");
      if (genre) {
        await filter(genre);
      }
    },
    [filter],
  );

  const handleOpenForm = (mode: FormMode, book?: Book) => {
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

  const handleFormSubmit = async (data: BookFormData) => {
    try {
      if (state.formMode === "add") {
        await create(data);
      } else if (state.formMode === "edit" && state.selectedBook) {
        const bookId = state.selectedBook.id;
        console.log("Updating book ID:", bookId, "Book:", state.selectedBook);
        await update(bookId, data);
      }
      await fetchBooks();
      handleCloseForm();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setState((prev) => ({
        ...prev,
        error: message,
      }));
    }
  };

  const handleDeleteClick = (book: Book) => {
    setState((prev) => ({
      ...prev,
      deleteConfirmation: { isOpen: true, book },
    }));
  };

  const handleConfirmDelete = async () => {
    if (!state.deleteConfirmation.book) return;

    try {
      const bookId = state.deleteConfirmation.book.id;
      console.log(
        "Confirming delete for book ID:",
        bookId,
        "Book:",
        state.deleteConfirmation.book,
      );
      await deleteBook(bookId);
      await fetchBooks();
      setState((prev) => ({
        ...prev,
        deleteConfirmation: { isOpen: false, book: null },
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete book";
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

  const errorMessage =
    state.error ||
    booksError?.message ||
    createError?.message ||
    updateError?.message ||
    deleteError?.message;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Management</h1>
          <p className="text-gray-600 mt-1">Manage your book collection</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <ErrorAlert
            message={errorMessage}
            onDismiss={() => setState((prev) => ({ ...prev, error: null }))}
          />
        )}

        {/* Toolbar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="primary"
                onClick={() => handleOpenForm("add")}
                disabled={state.formMode !== null}
              >
                + Add Book
              </Button>
              <div className="text-sm text-gray-600">
                {displayedBooks.length} book
                {displayedBooks.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <SearchBar
                  onSearch={handleSearch}
                  disabled={state.formMode !== null}
                  placeholder="Search by title or author..."
                />
              </div>
              <GenreFilter
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
                disabled={state.formMode !== null}
              />
            </div>
          </div>
        </div>

        {/* Book List */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : displayedBooks.length === 0 ? (
          <EmptyState
            title={searchQuery ? "No books found" : "No books yet"}
            description={
              searchQuery
                ? "Try a different search term"
                : "Start by adding your first book"
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={() => handleOpenForm("edit", book)}
                onDelete={handleDeleteClick}
                isDeleting={
                  deletingBook && state.deleteConfirmation.book?.id === book.id
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={state.formMode !== null}
        onClose={handleCloseForm}
        title={state.formMode === "add" ? "Add New Book" : "Edit Book"}
      >
        <BookForm
          book={state.selectedBook || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          isLoading={creatingBook || updatingBook}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      {state.deleteConfirmation.isOpen && state.deleteConfirmation.book && (
        <DeleteConfirmation
          bookTitle={state.deleteConfirmation.book.title}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={deletingBook}
        />
      )}
    </div>
  );
};
