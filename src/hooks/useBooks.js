import { useState, useCallback } from "react";
import bookApi from "../services/bookApi";
export function useBooks() {
    const [state, setState] = useState({
        data: null,
        loading: false,
        error: null,
    });
    const fetchBooks = useCallback(async () => {
        setState({ data: null, loading: true, error: null });
        try {
            const books = await bookApi.getAllBooks();
            setState({ data: books, loading: false, error: null });
            return books;
        }
        catch (error) {
            const err = error instanceof Error ? error : new Error("Failed to fetch books");
            setState({ data: null, loading: false, error: err });
            throw err;
        }
    }, []);
    return { ...state, fetchBooks };
}
export function useCreateBook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const create = useCallback(async (book) => {
        setLoading(true);
        setError(null);
        try {
            const newBook = await bookApi.createBook(book);
            setLoading(false);
            return newBook;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to create book");
            setError(error);
            setLoading(false);
            throw error;
        }
    }, []);
    return { create, loading, error };
}
export function useUpdateBook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const update = useCallback(async (id, book) => {
        setLoading(true);
        setError(null);
        try {
            const updatedBook = await bookApi.updateBook(id, book);
            setLoading(false);
            return updatedBook;
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to update book");
            setError(error);
            setLoading(false);
            throw error;
        }
    }, []);
    return { update, loading, error };
}
export function useDeleteBook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const delete_ = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await bookApi.deleteBook(id);
            setLoading(false);
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to delete book");
            setError(error);
            setLoading(false);
            throw error;
        }
    }, []);
    return { delete: delete_, loading, error };
}
export function useSearchBooks() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const search = useCallback(async (query) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const books = await bookApi.searchBooks(query);
            setResults(books);
            setLoading(false);
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to search books");
            setError(error);
            setLoading(false);
        }
    }, []);
    return { results, loading, error, search };
}
export function useFilterBooks() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const filter = useCallback(async (genre) => {
        if (!genre) {
            setResults([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const books = await bookApi.filterByGenre(genre);
            setResults(books);
            setLoading(false);
        }
        catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to filter books");
            setError(error);
            setLoading(false);
        }
    }, []);
    return { results, loading, error, filter };
}
