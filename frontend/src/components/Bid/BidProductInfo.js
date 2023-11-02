import React from "react";

function BidProductInfo({ product }) {
  return (
    <div className="sm:w-[800px]">
      <div>
        <img src={product.image} alt={product.model} className="sm:h-[450px]" />
      </div>

      <div className="mt-2">
        <h3 className="text-xl font-medium">{product.model}</h3>
        <p className="mt-2">{product.description} </p>
      </div>
    </div>
  );
}

export default BidProductInfo;
