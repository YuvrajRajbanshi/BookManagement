import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LoadingSpinner = ({ message = "Loading...", }) => {
    return (_jsx("div", { className: "flex items-center justify-center py-12", children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("div", { className: "animate-spin", children: _jsx("div", { className: "h-8 w-8 border-4 border-gray-200 border-t-gray-900 rounded-full" }) }), _jsx("p", { className: "text-gray-600 text-sm", children: message })] }) }));
};
export const BookCardSkeleton = () => {
    return (_jsx("div", { className: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-6 bg-gray-200 rounded w-3/4 animate-pulse" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2 animate-pulse" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-2/3 animate-pulse" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/3 animate-pulse" }), _jsxs("div", { className: "flex gap-2 pt-4", children: [_jsx("div", { className: "h-9 bg-gray-200 rounded w-1/4 animate-pulse" }), _jsx("div", { className: "h-9 bg-gray-200 rounded w-1/4 animate-pulse" })] })] }) }));
};
