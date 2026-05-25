import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ variant = "primary", size = "md", isLoading = false, disabled, children, className, ...props }) => {
    const baseStyles = "font-medium rounded transition-colors duration-200 inline-flex items-center justify-center gap-2 font-medium rounded";
    const variantStyles = {
        primary: "bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-200",
        danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
    };
    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };
    const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
    ${className || ""}
  `.trim();
    return (_jsxs("button", { disabled: disabled || isLoading, className: combinedClassName, ...props, children: [isLoading && (_jsx("div", { className: "h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" })), children] }));
};
