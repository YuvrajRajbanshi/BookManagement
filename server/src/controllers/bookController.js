import Book from "../models/Book.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";

// Get all books
export const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
    count: books.length,
  });
});

// Get single book by ID
export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
      status: 404,
    });
  }

  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

// Create a new book
export const createBook = asyncHandler(async (req, res) => {
  const { title, author, genre, publicationYear } = req.body;

  // Validate required fields
  if (!title || !author || !genre || publicationYear === undefined) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: title, author, genre, publicationYear",
      status: 400,
    });
  }

  const book = new Book({
    title,
    author,
    genre,
    publicationYear,
  });

  await book.save();

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

// Update a book
export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publicationYear } = req.body;

  // Check if book exists
  let book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
      status: 404,
    });
  }

  // Update fields only if provided
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (genre !== undefined) book.genre = genre;
  if (publicationYear !== undefined) book.publicationYear = publicationYear;

  await book.save();

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});

// Delete a book
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
      status: 404,
    });
  }

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: book,
  });
});

// Search books by title or author
export const searchBooks = asyncHandler(async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({
      success: false,
      message: "Please provide a search query",
      status: 400,
    });
  }

  const books = await Book.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ],
  });

  res.status(200).json({
    success: true,
    message: "Search completed successfully",
    data: books,
    count: books.length,
  });
});

// Filter books by genre
export const filterByGenre = asyncHandler(async (req, res) => {
  const { genre } = req.query;

  if (!genre) {
    return res.status(400).json({
      success: false,
      message: "Please provide a genre",
      status: 400,
    });
  }

  const books = await Book.find({ genre });

  res.status(200).json({
    success: true,
    message: "Books filtered successfully",
    data: books,
    count: books.length,
  });
});
