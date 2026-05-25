import React, { useState, useEffect } from "react";
import { Book, BookFormData } from "../types";
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

interface BookFormProps {
  book?: Book;
  onSubmit: (data: BookFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({
  book,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    genre: "",
    publicationYear: new Date().getFullYear(),
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BookFormData, string>>
  >({});

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

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }
    if (!formData.genre) {
      newErrors.genre = "Genre is required";
    }
    if (
      !formData.publicationYear ||
      formData.publicationYear < 1000 ||
      formData.publicationYear > new Date().getFullYear() + 1
    ) {
      newErrors.publicationYear = "Please enter a valid year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "publicationYear" ? parseInt(value) : value,
    }));
    if (errors[name as keyof BookFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Book Title *
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
          placeholder="Enter book title"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Author *
        </label>
        <input
          id="author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
          placeholder="Enter author name"
        />
        {errors.author && (
          <p className="text-red-600 text-sm mt-1">{errors.author}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="genre"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Genre *
        </label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
        >
          <option value="">Select a genre</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && (
          <p className="text-red-600 text-sm mt-1">{errors.genre}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="publicationYear"
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          Publication Year *
        </label>
        <input
          id="publicationYear"
          type="number"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
          placeholder="Enter publication year"
          min="1000"
          max={new Date().getFullYear() + 1}
        />
        {errors.publicationYear && (
          <p className="text-red-600 text-sm mt-1">{errors.publicationYear}</p>
        )}
      </div>

      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="flex-1"
        >
          {book ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
};
