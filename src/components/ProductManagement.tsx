import React, { useState, useEffect } from "react";
import axios from "axios";
import DashBoardSidBar from "./DashBoardSideBar";
import { useNavigate } from "react-router-dom";

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

      // Set the retrieved products in the state
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleAddNewProduct = () => {
    navigate("/addNewProduct");
  };

  // Handle editing a product
  const handleEdit = (product: any) => {
    // Implement the logic to handle editing a product here
    // You can set the selected product in state and open a modal for editing
    console.log("Edit product:", product);
  };

  // Function to filter products based on search term
  const filteredProducts = products.filter((product: any) =>
    product.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <main className="flex-1 p-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold">Product Management</h1>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddNewProduct}
          >
            Add New Product
          </button>
        </div>
        <div className="container mx-auto mt-5">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md mb-3"
          />
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Update</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product: any) => (
                <tr key={product.productId}>
                  <td className="border px-4 py-2">{product.productname}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">
                    {product.productcategory}
                  </td>
                  <td className="border px-4 py-2">{product.productprice}</td>
                  <td className="border px-4 py-2">
                    <img src={product.image} alt="Image" />
                  </td>
                  <td className="border px-4 py-2">{product.productqty}</td>
                  <td className="border px-4 py-2">{product.productstatus}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

export default ProductManagement;
