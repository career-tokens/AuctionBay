import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const auctionContext = createContext();

function AuctionContextProvider({ children }) {
  // using the axios.get() method to get the product data from the server.
  // and then emit the product data to the socket.
  const getOneProduct = async (model, socket) => {
    const url = `${process.env.REACT_APP_TO_BACKEND_URL}/products/${model}`;
    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });
      socket.emit("bid", response.data.data.product, model);
    } catch (error) {
      console.error(error);
    }
  };

  // using the axios.put() method to send the updated product data to the server.
  const updateProduct = async (product) => {
    const url = `${process.env.REACT_APP_TO_BACKEND_URL}/products`;

    try {
      const response = await axios.put(url, product, { withCredentials: true });
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
