import React from "react";

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-sm overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 w-full bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        {/* Description */}
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-3 w-3 bg-gray-200 rounded"
            />
          ))}
          <div className="h-3 w-8 bg-gray-200 rounded ml-2" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-300 rounded-lg mt-4" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
