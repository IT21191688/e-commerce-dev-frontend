import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSideBar from "./DashBoardSideBar";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

interface Review {
  _id: string;
  userid: string;
  orderid: string;
  reviewtext: string;
  rating: number;
}

const ReviewManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

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
        "https://dev-stack-backend.onrender.com/api/v1/review/getAllReviews",
        {
          headers,
        }
      );

      setReviews(response.data.data);
    } catch (error) {
      showErrorToast("Error fetching reviews:");
      console.error("Error fetching reviews:", error);
    }
  };

  const handleRemove = async (reviewId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(
        `https://dev-stack-backend.onrender.com/api/v1/review/deleteReview/${reviewId}`,
        {
          headers,
        }
      );

      showSuccessToast("review delete Success");

      setTimeout(() => {
        fetchReviews();
      }, 2000);
    } catch (error) {
      showErrorToast("Error deleting review:");
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <DashBoardSideBar />
      <main className="flex-1 p-5">
        <h1 className="text-3xl font-bold mb-5">Review Management</h1>
        <div className="container mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Review Text</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review: any) => (
                <tr key={review._id}>
                  <td className="border px-4 py-2">
                    {review.userid.firstname + " " + review.userid.lastname}
                  </td>
                  <td className="border px-4 py-2">{review.orderid}</td>
                  <td className="border px-4 py-2">{review.reviewtext}</td>
                  <td className="border px-4 py-2">{review.rating}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleRemove(review._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReviewManagement;
