import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";
import { showSuccessToast } from "./services/AlertService";

const UserReview: React.FC = () => {
  const navigate = useNavigate();

  const { orderId } = useParams();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number | undefined>(undefined);

  const handleReviewTextChange = (e: any) => {
    setReviewText(e.target.value);
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        reviewtext: reviewText,
        rating: rating,
        orderid: orderId,
      };

      const responce = await axios.post(
        `https://dev-stack-backend.onrender.com/api/v1/review/createReview`,
        body,
        {
          headers,
        }
      );

      if (responce.status === 201) {
        showSuccessToast("Review submitted successfully!");

        setTimeout(() => {
          navigate("/userHome");
        }, 2000);
      }

      //console.log("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
      // Handle error scenario
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-7xl ${
            i <= (rating || 0) ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleRatingClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Order Review</h1>
        <h2>
          <b>Order Id</b> {orderId}
        </h2>
        <br />
        <div>
          <label className="block mb-2">Review:</label>
          <textarea
            value={reviewText}
            onChange={handleReviewTextChange}
            placeholder="Enter your review"
            className="w-full h-20 border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>

        <div className="mt-4 flex items-center">{renderStars()}</div>

        <button
          onClick={submitReview}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 mt-8"
        >
          Submit Review
        </button>
      </div>
      <Footer />
    </>
  );
};

export default UserReview;
