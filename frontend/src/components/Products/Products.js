import React, { useContext, useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
import { authContext } from "../../context/authContext/authContextProvider";
import axios from "axios";
import TextField from '@mui/material/TextField';

function Products() {
  const { user } = useContext(authContext);
  const [productList, setProductList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);

  const updateProductList = async () => {
    try {
      const response = await axios.post(`https://realtime-auction-backend.onrender.com/users/getproducts`);
      if (response.status === 200) {
        setProductList(response.data);
      }
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  useEffect(() => {
    updateProductList();
  }, []);

  useEffect(() => {
    // Filter the productList based on the user's search input
    const filteredProducts = productList.filter((product) =>
      product.model.toLowerCase().startsWith(searchInput.toLowerCase())
    );

    setFilteredProductList(filteredProducts);
  }, [searchInput, productList]);

  return (
    <div className="flex flex-col justify-center p-3">
      <h1 className="text-xl font-medium px-1 text-white text-center pb-4">All Auctions</h1>
      <div className="search-bar text-center m-5 rounded-xl">
      <input
          type="text"
          placeholder="Search..."
          className="p-3 outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {filteredProductList.length > 0 ? (
        <div className="flex flex-wrap justify-evenly items-center gap-y-5">
          {filteredProductList.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p>No matching products found.</p>
      )}
    </div>
  );
}

export default Products;
