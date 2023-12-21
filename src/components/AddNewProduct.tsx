import React, { useState } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { useNavigate } from "react-router-dom";

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();

  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [productcategory, setProductCategory] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productqty, setProductQty] = useState("");
  const [productimage, setProductImage] = useState<File | undefined>(undefined);
  const [productstatus, setProductStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productname", productname);
      formData.append("description", description);
      formData.append("productcategory", productcategory);
      formData.append("productprice", parseFloat(productprice).toString()); // Convert to a string if required
      formData.append("productqty", parseInt(productqty).toString()); // Convert to a string if required
      formData.append("productimage", productimage || "");
      formData.append("productstatus", productstatus);
      // formData.append("addedBy", "611234567890123456789012"); // Replace this with a valid user ID from your database

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Set content type to multipart form-data
      };

      const response = await axios.post(
        "http://localhost:8090/api/v1/product/createProduct",
        formData,
        {
          headers,
        }
      );

      if (response.status === 201) {
        console.log("Product added successfully!");
      } else {
        console.error("Failed to add product");
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
          <h1 className="text-3xl font-bold">Add New Product</h1>
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
                // value={product.productname}
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
                // value={product.description}
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
                // value={product.productcategory}
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
                // value={product.productprice}
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
                // value={product.productqty}
                onChange={(e) => setProductQty(e.target.value)}
                className="form-control border-gray-300 rounded-md w-full p-2 mt-1"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file: any = e.target.files?.[0];
                  if (file) {
                    setProductImage(file);
                  }
                }}
                className="mt-2"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Product Status:
              </label>
              <select
                name="productstatus"
                // value={product.productstatus}
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
                Add Product
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

export default ProductManagement;
