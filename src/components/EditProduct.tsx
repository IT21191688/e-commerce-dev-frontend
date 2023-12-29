import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    //fetchCustomers();
    fetchProductDetails();
  }, []);

  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productcategory, setProductCategory] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productqty, setProductQty] = useState("");
  //const [productimage, setProductImage] = useState<File | undefined>(undefined);
  const [productstatus, setProductStatus] = useState("");

  const fetchProductDetails = async () => {
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
        `http://localhost:8090/api/v1/product/getOneProduct/${productId}`, // Replace with your endpoint to get product details by ID
        {
          headers,
        }
      );

      const productDetails = response.data.data; // Assuming the response contains the product details
      // Set product details into state
      setProductName(productDetails.productname);
      setDescription(productDetails.description);
      setProductCategory(productDetails.productcategory);
      setProductPrice(productDetails.productprice.toString());
      setProductQty(productDetails.productqty.toString());
      //  setProductImage(productDetails.productimage);
      setProductStatus(productDetails.productstatus);
    } catch (error) {
      showErrorToast("Error fetching product details");
      console.error("Error fetching product details:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productname", productname);
      formData.append("description", description);
      formData.append("productcategory", productcategory);
      formData.append("productprice", parseFloat(productprice).toString());
      formData.append("productqty", parseInt(productqty).toString());
      formData.append("productstatus", productstatus);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(
        `http://localhost:8090/api/v1/product/updateProduct/${productId}`,
        formData,
        {
          headers,
        }
      );

      console.log(response);

      if ((response.data.isSuccessful = true)) {
        // console.log("Product added successfully!");
        showSuccessToast("Product Edit successfully!");

        setTimeout(() => {
          navigate("/productManagement");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = () => {
    navigate("/productManagement");
  };

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold">Edit Product Details</h1>
        </div>
        <div className="container mx-auto mt-3">
          <form>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Name:
              </label>
              <input
                type="text"
                name="productname"
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                rows={2}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Category:
              </label>
              <input
                type="text"
                name="productcategory"
                value={productcategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Price:
              </label>
              <input
                type="number"
                name="productprice"
                value={productprice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Quantity:
              </label>
              <input
                type="number"
                name="productqty"
                value={productqty}
                onChange={(e) => setProductQty(e.target.value)}
                className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Status:
              </label>
              <select
                name="productstatus"
                value={productstatus}
                onChange={(e) => setProductStatus(e.target.value)}
                className="form-select border-gray-300 rounded-md w-full p-2 mt-1"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Edit Product
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel} // Implement handleCancel function
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
