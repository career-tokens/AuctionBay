import React, { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { authContext } from "../../context/authContext/authContextProvider";
import MoonLoader from "react-spinners/MoonLoader";



function Products() {
  const { user } = useContext(authContext);
  const [productList, setProductList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);

  const updateProductList = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_TO_BACKEND_URL}/users/getproducts`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const response = await res.json();
        setProductList(response);
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
    <div className="flex flex-col justify-center p-3 pt-[14vh]">
      <h1 className="text-xl font-medium px-1 text-white text-center pb-4 font-[Montserrat]">ALL AUCTIONS</h1>
      <div className="search-bar text-center m-5 mb-[7vh] rounded-xl">
      <input
          type="text"
          placeholder="Search..."
          className="p-3 outline-none rounded-lg"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {filteredProductList.length > 0 ? (
        <div className="flex flex-wrap justify-evenly items-center gap-y-[7vh]">
          {filteredProductList.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <Example/>
      )}
    </div>
  );
}

export default Products;

const Example = () => {
  return (
    <div>
      <CutoutTextLoader
        height="450px"
        background="white"
        imgUrl="https://www.hover.dev/imgs/random/11.jpg"
      />
    </div>
  );
};

const CutoutTextLoader = ({
  height,
  background,
  imgUrl,
}) => {
  return (
    <div className="relative rounded-xl" style={{ height }}>
      <div
        className="absolute inset-0 z-0 rounded-xl"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        style={{ background }}
        className="absolute inset-0 animate-pulse z-10 rounded-xl"
      />
      <span
        className="rounded-xl font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: height,
        }}
      >
        Loading...
      </span>
    </div>
  );
};

//