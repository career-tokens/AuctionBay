import React, { useContext, useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
import { authContext } from "../../context/authContext/authContextProvider";
import axios from "axios";
function Products() {
  const { user } = useContext(authContext);
  const [productList, setProductList] = useState([]);
  const updateProductList = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/users/getproducts`);//need to get all the products
      //had to make it post since for some reason get api was not working
      if (response.status === 200) {
        setProductList(response.data);
        console.log(response)
      }
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  useEffect(() => {
    updateProductList();
  }, []);
  return (
    <div>
      <h1 className="text-xl font-medium px-1">All Auctions</h1>
{ productList&&<div className="grid sm:grid-cols-3  gap-6 mt-12">
        {productList.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>}
    </div>
  );
}

export default Products;
