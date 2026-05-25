import React from "react";
import { Book } from "../types";
import { Button } from "./Button";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  isDeleting?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{book.author}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="inline-block bg-gray-100 px-3 py-1 rounded">
            {book.genre}
          </span>
          <span>{book.publicationYear}</span>
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(book)}
            className="flex-1"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            isLoading={isDeleting}
            onClick={() => onDelete(book)}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
