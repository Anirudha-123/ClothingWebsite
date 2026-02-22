const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 pt-20 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* ================= IMAGE SECTION ================= */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* LEFT THUMBNAILS (Desktop Only) */}
          <div className="hidden md:flex flex-col gap-3 w-20 lg:w-24">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="h-28 lg:h-32 bg-gray-300 animate-pulse rounded"
              />
            ))}
          </div>

          {/* MAIN IMAGE (Desktop Only) */}
          <div className="hidden md:block flex-1">
            <div className="h-112.5 lg:h-150 bg-gray-300 animate-pulse rounded" />
          </div>

          {/* MOBILE IMAGE */}
          <div className="md:hidden w-full">
            <div className="h-105 bg-gray-300 animate-pulse rounded" />

            {/* Mobile progress line */}
            <div className="relative mt-3 h-1 bg-gray-200 w-full">
              <div className="absolute h-1 bg-gray-400 w-1/3" />
            </div>
          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div className="flex flex-col space-y-4">

          {/* Title */}
          <div className="w-3/4 h-6 md:h-7 bg-gray-300 animate-pulse rounded" />

          {/* Rating */}
          <div className="w-32 h-4 bg-gray-300 animate-pulse rounded" />

          {/* Price */}
          <div className="flex gap-3">
            <div className="w-20 h-6 bg-gray-300 animate-pulse rounded" />
            <div className="w-16 h-4 bg-gray-300 animate-pulse rounded" />
            <div className="w-14 h-4 bg-gray-300 animate-pulse rounded" />
          </div>

          {/* Sizes */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="w-12 h-8 md:w-16 md:h-10 bg-gray-300 animate-pulse rounded"
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-40 h-12 bg-gray-300 animate-pulse rounded" />
            <div className="w-full sm:w-40 h-12 bg-gray-300 animate-pulse rounded" />
          </div>

          {/* Description lines */}
          <div className="space-y-2 mt-2">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="w-full h-4 bg-gray-300 animate-pulse rounded"
              />
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-gray-200 rounded-lg p-4 space-y-3 mt-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
                <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;