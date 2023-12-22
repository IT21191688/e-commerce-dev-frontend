import axios from "axios";
import React, { useEffect, useState } from "react";
import sliderImage1 from "../assets/sliderImage1.jpg";
import sliderImage2 from "../assets/sliderImage2.jpg";
import sliderImage3 from "../assets/sliderImage3.jpg";
import Footer from "./Footer";

const UserHome: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://localhost:8090/api/v1/product/getAllProduct",
        { headers }
      );

      console.log(response.data.data);

      // Set the retrieved products in the state
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100 h-96"
                src={sliderImage1}
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 h-96"
                src={sliderImage2}
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 h-96"
                src={sliderImage3}
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div className="container pt-5 h-full">
        <h1 className="text-center text-black font-inter font-bold text-2xl md:text-4xl">
          FEATURED PRODUCTS
        </h1>

        <h3 className="text-center text-black font-inter font-bold text-xl md:text-2xl">
          Explore an extensive array of curated products featured on our
          homepage, designed to cater to your needs and elevate your shopping
          experience.
        </h3>
        <div className="mt-5">
          <div className="flex flex-wrap justify-center" id="row1">
            {products.slice(0, 4).map((product: any) => (
              <div
                key={product._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden justify-center items-center">
                  <center>
                    <img
                      src={product.productimage}
                      alt="Product Image"
                      className="w-auto h-40 object-cover"
                    />
                  </center>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.productname}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-gray-800 font-bold mb-2">
                      ${product.productprice}
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center" id="row2">
            {products.slice(4, 8).map((product: any) => (
              <div
                key={product._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <center>
                    <img
                      src={product.productimage}
                      alt="Product Image"
                      className="w-auto h-40 object-cover"
                    />
                  </center>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.productname}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-gray-800 font-bold mb-2">
                      ${product.productprice}
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container h-full mt-5 pb-30">
        <h1 className="text-center text-black font-inter font-bold text-2xl md:text-4xl">
          WHAT IS SAYS OUR CUSTOMER
        </h1>

        <h3 className="text-center text-black font-inter font-bold text-xl md:text-2xl">
          Explore our collection of top products, adored by customers for
          quality and satisfaction.
        </h3>

        <div id="feedback" className="feedback-box bg-gray-100 rounded-lg">
          <div className="customer-info">
            <h3 className="customer-name text-lg font-semibold mb-2">
              John Doe
            </h3>
            <p className="product-name text-sm text-gray-600">Product Name</p>
          </div>
          <div className="feedback-content mt-2">
            <p className="feedback-text text-gray-800">
              Excellent service! Highly recommended!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserHome;
