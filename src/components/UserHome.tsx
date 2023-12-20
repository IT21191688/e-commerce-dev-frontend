import React, { useEffect } from "react";
import sliderImage1 from "../assets/sliderImage1.jpg";
import sliderImage2 from "../assets/sliderImage2.jpg";
import sliderImage3 from "../assets/sliderImage3.jpg";
import Footer from "./Footer";

const UserHome: React.FC = () => {
  useEffect(() => {
    displayProductsInRows();
    displayFeedbacks();
  }, []);

  function displayProductsInRows() {
    const products = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
      { id: 4, name: "Product 4" },
      { id: 5, name: "Product 5" },
      { id: 6, name: "Product 6" },
      { id: 7, name: "Product 7" },
      { id: 8, name: "Product 8" },
      { id: 9, name: "Product 9" },
      { id: 10, name: "Product 10" },
      { id: 11, name: "Product 11" },
      { id: 12, name: "Product 12" },
      { id: 13, name: "Product 13" },
      { id: 14, name: "Product 14" },
      { id: 15, name: "Product 15" },
      { id: 16, name: "Product 16" },
    ];

    let currentProductIndex = 0;

    function displayProducts() {
      const row1 = document.getElementById("row1");
      const row2 = document.getElementById("row2");

      if (!row1 || !row2) {
        console.error("Row elements not found");
        return;
      }

      row1.innerHTML = "";
      row2.innerHTML = "";

      for (let i = 0; i < 10; i++) {
        const product = products[currentProductIndex];
        const item = document.createElement("div");
        item.classList.add(
          "w-40",
          "h-40",
          "bg-gray-200",
          "m-4",
          "flex",
          "items-center",
          "justify-center",
          "rounded-md"
        );
        item.textContent = product.name;

        if (i < 5) {
          row1.appendChild(item);
        } else {
          row2.appendChild(item);
        }

        currentProductIndex = (currentProductIndex + 1) % products.length;
      }
    }

    displayProducts();

    setInterval(displayProducts, 5000); // Change products every 5 seconds
  }

  // Call the function to display products in rows
  displayProductsInRows();
  function displayFeedbacks() {
    const feedbackData = [
      {
        customer: "John Doe",
        product: "Product A",
        feedback: "Excellent service! Highly recommended!",
      },
      // Add more feedback objects as needed
    ];

    let currentFeedbackIndex = 0;

    function displayFeedback() {
      const feedbackElement = document.getElementById("feedback");

      if (!feedbackElement) {
        console.error("Feedback element not found");
        return;
      }

      const customerName = document.getElementById("customer-name");
      const productName = document.getElementById("product-name");
      const feedbackText = document.getElementById("feedback-text");

      const { customer, product, feedback } =
        feedbackData[currentFeedbackIndex];

      if (customerName) {
        customerName.textContent = customer;
      }
      if (productName) {
        productName.textContent = product;
      }
      if (feedbackText) {
        feedbackText.textContent = feedback;
      }

      currentFeedbackIndex = (currentFeedbackIndex + 1) % feedbackData.length;
    }

    displayFeedback();

    setInterval(displayFeedback, 5000);
  }

  displayFeedbacks();

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

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center" id="row1"></div>
          <div className="flex flex-wrap justify-center" id="row2"></div>
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
