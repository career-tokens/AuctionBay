import React from "react";

function BidProductInfo({ product}) {
  console.log("product: ",product)
  return (
    <div className="sm:w-[800px]">
      <div className="flex w-full justify-center items-center">
        <img src={product.url} alt={product.model} className="sm:h-[450px]" />
      </div>

      <div className="mt-2 text-center text-white">
        <h3 className="text-xl font-medium">{product.model}</h3>
        <p className="mt-2">{product.description} </p>
      </div>
    </div>
  );
}

export default BidProductInfo;
