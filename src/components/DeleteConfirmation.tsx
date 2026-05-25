import React from "react";
import { Button } from "./Button";

interface DeleteConfirmationProps {
  bookTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  bookTitle,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Delete Book</h2>
          <p className="text-gray-600 text-sm mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium">"{bookTitle}"</span>? This action
            cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
