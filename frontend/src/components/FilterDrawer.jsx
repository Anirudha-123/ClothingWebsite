import React from "react";

const FilterDrawer = ({
  show,
  setShow,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  categoryOptions,
}) => {
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        show ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5 space-y-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filter</h2>
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Category */}
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          {categoryOptions.map((cat) => (
            <label key={cat} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>

          <input
            type="number"
            placeholder="Min"
            className="border w-full mb-2 p-2 rounded"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Max"
            className="border w-full p-2 rounded"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
          />
        </div>

        {/* Buttons */}
        <div className="mt-auto space-y-3">
          <button
            onClick={() => setShow(false)}
            className="w-full bg-black text-white py-2 rounded"
          >
            Apply
          </button>

          <button
            onClick={() => {
              setSelectedCategories([]);
              setPriceRange({ min: "", max: "" });
            }}
            className="w-full border py-2 rounded"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;