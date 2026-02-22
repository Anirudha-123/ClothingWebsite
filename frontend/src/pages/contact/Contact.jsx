import React from "react";

const Contact = () => {
  return (
    <div className="bg-white">

      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src="/contact_img1.png"
          alt="Contact Clothing Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wide">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* Left Info */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Get In Touch
          </h2>

          <p className="text-gray-600 mb-8">
            We'd love to hear from you. Whether you have a question
            about products, orders, or partnerships — our team is ready to help.
          </p>

          <div className="space-y-4 text-gray-700">
            <p><strong>Email:</strong> support@clothingstore.com</p>
            <p><strong>Phone:</strong> +91 9876543210</p>
            <p><strong>Address:</strong> Mumbai, India</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
          <form className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>

    </div>
  );
};

export default Contact;