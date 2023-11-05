import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const auctionContext = createContext();

function AuctionContextProvider({ children }) {
  // using the fetch.get() method to get the product data from the server.
  // and then emit the product data to the socket.
  const getOneProduct = async (model, socket) => {
    const url = `${process.env.REACT_APP_TO_BACKEND_URL}/products/${model}`;
    try {
      const res = await fetch(url, {
        credentials: 'include',
      });
      
      const response = await res.json();
      
      socket.emit("bid", response.data.product, model);
    } catch (error) {
      console.error(error);
    }
  };

  // using the fetch.put() method to send the updated product data to the server.
  const updateProduct = async (product) => {
    const url = `${process.env.REACT_APP_TO_BACKEND_URL}/products`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
        credentials: 'include',
      });
      
      const response = await res.json();
      
      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <auctionContext.Provider value={{ getOneProduct, updateProduct }}>
      {children}
    </auctionContext.Provider>
  );
}

export default AuctionContextProvider;
