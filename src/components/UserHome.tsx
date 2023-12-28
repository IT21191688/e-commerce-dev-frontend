import axios from "axios";
import React, { useEffect, useState } from "react";
import sliderImage1 from "../assets/sliderImage1.jpg";
import sliderImage2 from "../assets/sliderImage2.jpg";
import sliderImage3 from "../assets/sliderImage3.jpg";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const UserHome: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchReviews();
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

      //console.log(response.data.data);

      // Set the retrieved products in the state
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchReviews = async () => {
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
        "http://localhost:8090/api/v1/review/getAllReviews",
        { headers }
      );

      console.log(response.data.data);

      // Set the retrieved products in the state
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars.push(
            <svg
              key={i}
              className="w-10 h-10 fill-current text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 1l2.5 6.5H19l-5 3.9 2.2 6.6L10 14.2 3.8 17.1l2.2-6.6-5-3.9h6.5L10 1z" />
            </svg>
          );
        } else {
          stars.push(
            <svg
              key={i}
              className="w-10 h-10 fill-current text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 1l2.5 6.5H19l-5 3.9 2.2 6.6L10 14.2 3.8 17.1l2.2-6.6-5-3.9h6.5L10 1z" />
            </svg>
          );
        }
      }
      return stars;
    };

    return <div className="flex">{renderStars()}</div>;
  };

  interface Review {
    userid: {
      firstname: string;
      lastname: string;
    };
    rating: number;
    reviewtext: string;
    // Add other properties as per your actual review object structure
  }

  const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
      <div className="bg-white rounded-md shadow-md p-4 mb-4">
        <p className="text-gray-600 mb-2 text-xl">
          Customer Name:{" "}
          {review.userid.firstname + " " + review.userid.lastname}
        </p>
        <StarRating rating={review.rating} />
        <p className="text-gray-600 mb-2">Review Text: {review.reviewtext}</p>
      </div>
    );
  };

  function handleProduct(productId: string) {
    navigate(`/productView/${productId}`);
  }

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
                      className="w-auto h-36 object-cover"
                    />
                  </center>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.productname}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-gray-800 font-bold mb-2 ${
                          product.productqty <= 0 ? "text-red-500" : ""
                        }`}
                      >
                        Rs{product.productprice}
                      </p>
                      <p
                        className={`text-gray-800 font-bold mb-2 ${
                          product.productqty <= 0
                            ? "text-red-500"
                            : product.productqty < 5
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {product.productqty}{" "}
                        {product.productqty <= 0 ? "Sold Out" : ""}
                      </p>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        handleProduct(product._id);
                      }}
                    >
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
                <div className="bg-white rounded-lg shadow-md overflow-hidden justify-center items-center">
                  <center>
                    <img
                      src={product.productimage}
                      alt="Product Image"
                      className="w-auto h-36 object-cover"
                    />
                  </center>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.productname}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-gray-800 font-bold mb-2 ${
                          product.productqty <= 0 ? "text-red-500" : ""
                        }`}
                      >
                        Rs{product.productprice}
                      </p>
                      <p
                        className={`text-gray-800 font-bold mb-2 ${
                          product.productqty <= 0
                            ? "text-red-500"
                            : product.productqty < 5
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {product.productqty}{" "}
                        {product.productqty <= 0 ? "Sold Out" : ""}
                      </p>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        handleProduct(product._id);
                      }}
                    >
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

        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">Latest Reviews</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {reviews.map((review: any) => (
              <div key={review._id} className="mb-4">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserHome;
