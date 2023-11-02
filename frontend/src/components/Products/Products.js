import React from "react";
import productsData from "../../data/products.json";
import ProductCard from "./ProductCard";
function Products() {
  const { products } = productsData;
  return (
    <div>
      <h1 className="text-xl font-medium px-1">All Auctions</h1>
      <div className="grid sm:grid-cols-3  gap-6 mt-12">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
