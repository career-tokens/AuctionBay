import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auctionContext } from "../../context/auctionContext/auctionContextProvider";
import { socket } from "../../socket/socket";

function ProductCard({ product }) {
  // a funciton if text length longer than 100 characters cut it and add ...
  const textEllipsis = (text) => {
    if (text.length > 100) {
      return text.slice(0, 100) + "...";
    }
  };

  return (
    <Link to={`bid/${product.id}`}>
      <div className="hover:scale-105 transition-all ease-in-out duration-200   bg-white border border-gray-200  shadow-2xl rounded-lg overflow-hidden ">
        <div className="overflow-hidden ">
          <img src={product.image} className="w-full h-64"></img>
        </div>
        <div className="px-4 py-6">
          <h1 className="text-lg font-semibold">{product.model}</h1>
          <p className="text-ellipsis h-24 overflow-hidden mt-3">
            {textEllipsis(product.description)}
          </p>
          <div className="bg-black text-white font-medium rounded p-2 text-center">
            <h1>Click The Card to Enter Auciton </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
