import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Modal = ({ isOpen, onClose, title, children, }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4", children: _jsxs("div", { className: "bg-white rounded-lg shadow-lg max-w-md w-full max-h-96 overflow-y-auto", children: [_jsxs("div", { className: "sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: title }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600 transition-colors", "aria-label": "Close modal", children: _jsx("svg", { className: "w-6 h-6", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] }), _jsx("div", { className: "p-6", children: children })] }) }));
};
