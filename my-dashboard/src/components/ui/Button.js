import React from "react";

export const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
