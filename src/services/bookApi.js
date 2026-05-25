import axios from "axios";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
    headers: {
        "Content-Type": "application/json",
    },
});
// Transform MongoDB _id to id
const transformBook = (book) => {
    const { _id, ...rest } = book;
    return {
        ...rest,
        id: _id,
    };
};
const transformBooks = (books) => books.map(transformBook);
export const bookApi = {
    getAllBooks: async () => {
        try {
            const response = await axiosInstance.get("/books");
            return transformBooks(response.data.data);
        }
        catch (error) {
            console.error("Error fetching books:", error);
            throw error;
        }
    },
    getBookById: async (id) => {
        try {
            const response = await axiosInstance.get(`/books/${id}`);
            return transformBook(response.data.data);
        }
        catch (error) {
            console.error("Error fetching book:", error);
            throw error;
        }
    },
    createBook: async (book) => {
        try {
            const response = await axiosInstance.post("/books", book);
            return transformBook(response.data.data);
        }
        catch (error) {
            console.error("Error creating book:", error);
            throw error;
        }
    },
    updateBook: async (id, book) => {
        try {
            const response = await axiosInstance.put(`/books/${id}`, book);
            return transformBook(response.data.data);
        }
        catch (error) {
            console.error("Error updating book:", error);
            throw error;
        }
    },
    deleteBook: async (id) => {
        try {
            console.log("Deleting book with ID:", id);
            if (!id || id === "undefined") {
                throw new Error("Book ID is undefined or invalid");
            }
            await axiosInstance.delete(`/books/${id}`);
        }
        catch (error) {
            console.error("Error deleting book:", error);
            throw error;
        }
    },
    searchBooks: async (query) => {
        try {
            const response = await axiosInstance.get("/books/search", {
                params: { search: query },
            });
            return transformBooks(response.data.data);
        }
        catch (error) {
            console.error("Error searching books:", error);
            throw error;
        }
    },
    filterByGenre: async (genre) => {
        try {
            const response = await axiosInstance.get("/books/filter", {
                params: { genre },
            });
            return transformBooks(response.data.data);
        }
        catch (error) {
            console.error("Error filtering books:", error);
            throw error;
        }
    },
};
export default bookApi;
