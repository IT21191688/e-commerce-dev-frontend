import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";

const UserProductView: React.FC = () => {
  const navigate = useNavigate();

  const userId = useParams();

  const [products, setProducts] = useState([]);

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
        `http://localhost:8090/api/v1/product/getOneProduct/${userId}`,
        { headers }
      );

      console.log(response.data.data);

      // Set the retrieved products in the state
      setProducts(response.data.data);
      // setFilteredProducts(response.data.data);
      //  alert(response.data.data.length);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <>
      <div className="container"></div>

      <div className="container"></div>

      <Footer />
    </>
  );
};

export default UserProductView;
