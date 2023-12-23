import React from "react";
import Footer from "./Footer";

const AboutUs: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

        {/* Company Overview Section */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
          <p className="text-lg text-gray-700">
            Welcome to [Your Company Name], your one-stop destination for
            quality products and exceptional service. Founded in [Year], we are
            dedicated to providing our customers with a seamless shopping
            experience and offering a wide range of premium products in [Product
            Category/Industry]. Our mission is to [Mission Statement].
          </p>
        </section>

        {/* Our Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="flex flex-wrap -mx-4">
            {/* Team Member Cards */}
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-gray-700">Co-founder & CEO</p>
                <p className="text-gray-600">
                  Bringing innovation and leadership
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-gray-700">Co-founder & CEO</p>
                <p className="text-gray-600">
                  Bringing innovation and leadership
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-gray-700">Co-founder & CEO</p>
                <p className="text-gray-600">
                  Bringing innovation and leadership
                </p>
              </div>
            </div>

            {/* Add more team member cards as needed */}
          </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <div className="flex flex-wrap -mx-4">
            {/* Testimonial Cards */}
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  "I am impressed with the quality of products and the excellent
                  customer service provided by [Your Company Name]. Definitely
                  recommending it to friends and family!"
                </p>
                <p className="text-gray-600 font-semibold">- Happy Customer</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  "I am impressed with the quality of products and the excellent
                  customer service provided by [Your Company Name]. Definitely
                  recommending it to friends and family!"
                </p>
                <p className="text-gray-600 font-semibold">- Happy Customer</p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  "I am impressed with the quality of products and the excellent
                  customer service provided by [Your Company Name]. Definitely
                  recommending it to friends and family!"
                </p>
                <p className="text-gray-600 font-semibold">- Happy Customer</p>
              </div>
            </div>
            {/* Add more testimonial cards as needed */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
