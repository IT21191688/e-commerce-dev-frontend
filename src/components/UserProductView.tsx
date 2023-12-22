import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";

const UserProductView: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Assuming the parameter name is "productId"

  const [product, setProduct] = useState({
    productname: "",
    description: "",
    productprice: 0,
    productimage: "",
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
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
        `http://localhost:8090/api/v1/product/getOneProduct/${productId}`,
        { headers }
      );

      //console.log(response.data.data);

      // Set the retrieved product in the state
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const addToCart = async () => {
    try {
      const formData = {
        productid: productId,
        quantity: quantity,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      // console.log(token);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:8090/api/v1/cart/addCart",
        formData,
        {
          headers,
        }
      );

      //console.log(response);

      if (response.status === 201) {
        alert("Product Add to cart Successfully");
        navigate("/userProducts");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Left side - Product details */}
        <div className="w-2/4 flex justify-center items-center pl-10">
          <div className="container mx-auto bg-white rounded shadow-lg p-8">
            <div className="mb-8 flex justify-between">
              <div className="w-1/2">
                <img
                  src={product.productimage}
                  alt={product.productname}
                  className="w-auto h-80"
                />
              </div>
              <div className="w-1/2">
                <h1 className="text-4xl font-bold text-red-600">
                  {product.productname}
                </h1>

                <p className="text-gray-700 font-bold text-lg my-4">
                  {product.description}
                </p>
                <p className="text-gray-600 text-lg">
                  Product Price: Rs. {product.productprice}
                </p>
                <div className="flex items-center justify-center my-6">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded-full mr-4"
                  >
                    -
                  </button>
                  <p className="text-xl font-semibold">{quantity}</p>
                  <button
                    onClick={increaseQuantity}
                    className="px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded-full ml-4"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-800 font-semibold text-3xl">
                  Total Price: Rs. {quantity * product.productprice}
                </p>
                <button
                  onClick={addToCart}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 mt-6 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Customer reviews */}
        <div
          className="w-2/4 flex justify-center items-center px-10"
          style={{ maxHeight: "400px", overflowY: "auto", marginTop: "150px" }}
        >
          <div className="container mx-auto bg-white rounded shadow-lg p-8 h-96 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
            <div className="border-t border-gray-300 py-4">
              {/* Individual customer review */}
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src="avatar.jpg"
                    alt="Customer Avatar"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Customer Name</p>
                  <p className="text-gray-500">"Great product! Loved it."</p>
                </div>
              </div>

              {/* More reviews can be dynamically added */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProductView;
