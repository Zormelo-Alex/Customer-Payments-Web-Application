import React from "react";

const LoadingSkeleton:React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-12 flex flex-col items-center justify-start">
      <div className="w-full mx-auto">
        {/* Top Skeleton Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-xl p-6 flex flex-col items-start animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
              <div className="h-8 w-16 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        {/* Payment Section Skeleton */}
        <div className="mb-6">
          <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-64 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Transaction Section Skeleton */}
        <div className="mb-6">
          <div className="h-6 w-56 bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-72 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <div className="mt-8 overflow-x-auto space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-900 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
