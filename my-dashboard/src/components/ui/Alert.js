import React from "react";

export const Alert = ({ children, className }) => {
  return (
    <div className={`p-3 border-l-4 rounded-md ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => <h3 className="font-semibold">{children}</h3>;
export const AlertDescription = ({ children }) => <p className="text-gray-500">{children}</p>;
