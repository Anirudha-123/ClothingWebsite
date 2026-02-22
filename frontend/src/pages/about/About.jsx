import React from "react";

const About = () => {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src="/about_img1.png"
          alt="Clothing Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wide">
            About Clothing Store
          </h1>
        </div>
      </div>

      {/* Brand Story */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Our Story
        </h2>

        <p className="text-gray-600 leading-8 text-lg text-center max-w-3xl mx-auto">
          Clothing Store was founded with a vision to redefine everyday fashion.
          We believe style should be effortless, premium, and accessible.
          Our collections blend modern trends with timeless elegance,
          designed for confident individuals who value quality and comfort.
        </p>
      </div>

      {/* Mission Vision Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          <div className="bg-white p-10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-7">
              To deliver high-quality fashion that inspires confidence and
              empowers individuality while maintaining sustainable practices.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-7">
              To become a globally recognized clothing brand known for
              innovation, premium craftsmanship, and customer satisfaction.
            </p>
          </div>

        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
            <h4 className="font-semibold text-xl mb-3">Premium Quality</h4>
            <p className="text-gray-600">
              Carefully crafted fabrics with superior comfort.
            </p>
          </div>

          <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
            <h4 className="font-semibold text-xl mb-3">Modern Design</h4>
            <p className="text-gray-600">
              Trend-forward styles that stand out.
            </p>
          </div>

          <div className="p-8 border rounded-2xl text-center hover:shadow-lg transition">
            <h4 className="font-semibold text-xl mb-3">Customer First</h4>
            <p className="text-gray-600">
              Exceptional service and seamless shopping experience.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;