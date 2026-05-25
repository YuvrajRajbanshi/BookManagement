import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a book title"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author name"],
      trim: true,
      minlength: [1, "Author name cannot be empty"],
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    genre: {
      type: String,
      required: [true, "Please provide a genre"],
      trim: true,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Mystery",
        "Science Fiction",
        "Fantasy",
        "Romance",
        "Biography",
        "History",
      ],
    },
    publicationYear: {
      type: Number,
      required: [true, "Please provide a publication year"],
      min: [1000, "Publication year must be at least 1000"],
      max: [
        new Date().getFullYear() + 1,
        "Publication year cannot be in the distant future",
      ],
    },
  },
  {
    timestamps: true,
  },
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
