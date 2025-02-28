import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => <div className="mb-2">{children}</div>;
export const CardTitle = ({ children }) => <h2 className="text-lg font-bold">{children}</h2>;
export const CardDescription = ({ children }) => <p className="text-gray-500">{children}</p>;
export const CardContent = ({ children }) => <div>{children}</div>;
export const CardFooter = ({ children }) => <div className="mt-2">{children}</div>;
