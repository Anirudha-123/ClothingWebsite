const ProductDetailsSkeleton = () => {
  return (
    <div
      className="container mx-auto px-2 mt-6 lg:px-8"
      style={{ marginTop: "100px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full bg-gray-300 animate-pulse rounded-md h-120 sm:h-100 md:h-125 lg:h-[150]" />

          <div className="flex flex-row lg:flex-col gap-2 ">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="w-full h-20 sm:h-24 lg:w-50 lg:h-50 bg-gray-300 animate-pulse rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="w-3/4 h-6 md:h-7 bg-gray-300 animate-pulse rounded" />

          <div className="flex items-center gap-2">
            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-12 h-4 bg-gray-300 animate-pulse rounded"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-20 h-6 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <div
                key={idx}
                className="w-12 h-8 md:w-16 md:h-10 bg-gray-300 animate-pulse rounded"
              />
            ))}
          </div>

          <div className="flex flex-row gap-3">
            <div className="w-full md:w-40 h-10 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-40 h-10 bg-gray-300 animate-pulse rounded"></div>
          </div>

          <div className="space-y-2 mt-2">
            {[1, 2, 3, 4].map((_, idx) => (
              <div
                key={idx}
                className="w-full h-4 md:h-5 bg-gray-300 animate-pulse rounded"
              />
            ))}
          </div>

          <div className="bg-gray-200 rounded-lg p-4 space-y-2 mt-4">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
