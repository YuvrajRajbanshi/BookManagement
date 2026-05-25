import axios, { AxiosInstance } from "axios"
import { Book, BookFormData } from "../types"

interface ApiSuccessResponse<T> {
  success: boolean
  message: string
  data: T
  count?: number
}

interface MongoBook {
  _id: string
  title: string
  author: string
  genre: string
  publicationYear: number
  createdAt?: string
  updatedAt?: string
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
  headers: {
    "Content-Type": "application/json",
  },
})

// Transform MongoDB _id to id
const transformBook = (book: MongoBook): Book => {
  const { _id, ...rest } = book
  return {
    ...rest,
    id: _id,
  } as Book
}

const transformBooks = (books: MongoBook[]): Book[] => books.map(transformBook)

export const bookApi = {
  getAllBooks: async (): Promise<Book[]> => {
    try {
      const response = await axiosInstance.get<ApiSuccessResponse<MongoBook[]>>(
        "/books"
      )
      return transformBooks(response.data.data)
    } catch (error) {
      console.error("Error fetching books:", error)
      throw error
    }
  },

  getBookById: async (id: string): Promise<Book> => {
    try {
      const response = await axiosInstance.get<ApiSuccessResponse<MongoBook>>(
        `/books/${id}`
      )
      return transformBook(response.data.data)
    } catch (error) {
      console.error("Error fetching book:", error)
      throw error
    }
  },

  createBook: async (book: BookFormData): Promise<Book> => {
    try {
      const response = await axiosInstance.post<ApiSuccessResponse<MongoBook>>(
        "/books",
        book
      )
      return transformBook(response.data.data)
    } catch (error) {
      console.error("Error creating book:", error)
      throw error
    }
  },

  updateBook: async (id: string, book: BookFormData): Promise<Book> => {
    try {
      const response = await axiosInstance.put<ApiSuccessResponse<MongoBook>>(
        `/books/${id}`,
        book
      )
      return transformBook(response.data.data)
    } catch (error) {
      console.error("Error updating book:", error)
      throw error
    }
  },

  deleteBook: async (id: string): Promise<void> => {
    try {
      console.log("Deleting book with ID:", id)
      if (!id || id === "undefined") {
        throw new Error("Book ID is undefined or invalid")
      }
      await axiosInstance.delete<ApiSuccessResponse<MongoBook>>(`/books/${id}`)
    } catch (error) {
      console.error("Error deleting book:", error)
      throw error
    }
  },

  searchBooks: async (query: string): Promise<Book[]> => {
    try {
      const response = await axiosInstance.get<ApiSuccessResponse<MongoBook[]>>(
        "/books/search",
        {
          params: { search: query },
        }
      )
      return transformBooks(response.data.data)
    } catch (error) {
      console.error("Error searching books:", error)
      throw error
    }
  },

  filterByGenre: async (genre: string): Promise<Book[]> => {
    try {
      const response = await axiosInstance.get<ApiSuccessResponse<MongoBook[]>>(
        "/books/filter",
        {
          params: { genre },
        }
      )
      return transformBooks(response.data.data)
    } catch (error) {
      console.error("Error filtering books:", error)
      throw error
    }
  },
}

export default bookApi
