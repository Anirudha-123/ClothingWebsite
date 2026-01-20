import React from "react";

const Spinner = ({ size = "10", color = "black", text = "Loading..." }) => {
  return (
    <div className="w-full min-h-100 flex flex-col justify-center items-center gap-4">
      <div
        className={`w-${size} h-${size} border-4 border-gray-300 border-t-${color} rounded-full animate-spin`}
      ></div>
      {text && <p className="text-gray-500 text-xl md:text-2xl font-semibold">{text}</p>}
    </div>
  );
};

export default Spinner;
