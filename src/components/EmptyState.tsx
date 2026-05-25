import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-sm">
        <div className="mb-4 flex justify-center">
          <svg
            className="w-16 h-16 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 15s4.5 8.747 10 8.747c5.5 0 10-3.747 10-8.747 0-4.247-4.5-8.747-10-8.747z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
    </div>
  );
};
