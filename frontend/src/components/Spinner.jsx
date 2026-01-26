const Spinner = ({ size = 40, color = "black", text = "Loading..." }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
      <div
        className="rounded-full animate-spin border-4 border-gray-300"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />
      {text && (
        <p className="text-gray-500 text-xl md:text-2xl font-semibold">
          {text}
        </p>
      )}
    </div>
  );
};

export default Spinner;
