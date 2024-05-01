import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <div className="text-3xl animate-spin">⏳</div>
    <p className="font-medium mt-2">Please wait</p>
    <p className="font-bold">Loading images...</p>
  </div>
);

export default LoadingSpinner;
