import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const UserProducts: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

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
      setFilteredProducts(response.data.data);
      //  alert(response.data.data.length);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    filterProducts(event.target.value, categoryFilter, priceFilter);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    filterProducts(searchText, category, priceFilter);
  };

  const handlePriceFilter = (price: string) => {
    setPriceFilter(price);
    filterProducts(searchText, categoryFilter, price);
  };

  const filterProducts = (search: string, category: string, price: string) => {
    let filtered = products.filter((product: any) => {
      return (
        product.productname.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || product.productcategory === category) &&
        (price === "" || product.productprice <= parseInt(price))
      );
    });
    setFilteredProducts(filtered);
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  function handleProduct(productId: string) {
    navigate(`/productView/${productId}`);
  }

  return (
    <>
      <div className="container">
        <div className="mt-4 mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchText}
            onChange={handleSearch}
            className="border rounded py-2 px-3"
          />
          <select
            value={categoryFilter}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="ml-2 border rounded py-2 px-3"
          >
            <option value="">All Categories</option>
            {/* Add options for product categories */}
          </select>
          <select
            value={priceFilter}
            onChange={(e) => handlePriceFilter(e.target.value)}
            className="ml-2 border rounded py-2 px-3"
          >
            <option value="">All Prices</option>
            {/* Add options for price ranges */}
          </select>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-wrap -mx-4 justify-center p-20">
          <div className="flex flex-wrap -mx-4">
            {currentProducts.map((product: any, index: number) => (
              <div
                key={product._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8 cursor-pointer"
                onClick={() => {
                  handleProduct(product._id);
                }}
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
                {index > 0 && (index + 1) % 4 === 0 && (
                  <div key={`divider-${index}`} className="w-full my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {filteredProducts.length > productsPerPage && (
          <ul className="flex list-none">
            {Array(Math.ceil(filteredProducts.length / productsPerPage))
              .fill(0)
              .map((_, index) => (
                <li
                  key={index}
                  className={`mx-1 cursor-pointer ${
                    currentPage === index + 1 ? "font-bold" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
          </ul>
        )}
      </div>

      <Footer />
    </>
  );
};

export default UserProducts;
