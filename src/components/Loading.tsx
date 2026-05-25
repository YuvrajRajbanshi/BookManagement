import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin">
          <div className="h-8 w-8 border-4 border-gray-200 border-t-gray-900 rounded-full" />
        </div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
};

export const BookCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="flex gap-2 pt-4">
          <div className="h-9 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="h-9 bg-gray-200 rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
