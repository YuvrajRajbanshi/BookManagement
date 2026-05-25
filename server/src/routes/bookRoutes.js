import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  filterByGenre,
} from "../controllers/bookController.js";

const router = express.Router();

// Get all books
router.get("/", getAllBooks);

// Search books
router.get("/search", searchBooks);

// Filter by genre
router.get("/filter", filterByGenre);

// Get single book by ID
router.get("/:id", getBookById);

// Create a new book
router.post("/", createBook);

// Update a book
router.put("/:id", updateBook);

// Delete a book
router.delete("/:id", deleteBook);

export default router;
