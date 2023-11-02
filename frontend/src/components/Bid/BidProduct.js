import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionContext } from "../../context/auctionContext/auctionContextProvider";
import { authContext } from "../../context/authContext/authContextProvider";
import data from "../../data/products.json";
import { changeProduct, createBid } from "../../lib/product";
import BiddersList from "./BiddersList";
import BidForm from "./BidForm";
import BidProductInfo from "./BidProductInfo";

const BidProduct = ({ socket }) => {
  const [amount, setAmount] = useState("");
  const [dataRecived, setDataRecived] = useState(null);
  const [currentBid, setCurrentBid] = useState({
    currentBid: 0,
    lastBidder: "",
    bids: [],
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const { user } = useContext(authContext);
  // get product from static json file
  const product = data.products.filter((product) => product.id === id).pop();

  const { getOneProduct, updateProduct } = useContext(auctionContext);
  // socket room
  const room = product.model;
  //getting initial data from db
  useEffect(() => {
    getOneProduct(product.model, socket);
  }, []);

  // join room
  useEffect(() => {
    socket.emit("join", product.model, (msg) => console.log(msg));

    return () => {
      socket.emit("leave", product.model, (msg) => console.log(msg));
    };
  }, [room]);

  // sending data to socket and update product in db
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBid = createBid(product, currentBid, user, amount);
    if (newBid.currentBid > currentBid.currentBid) {
      socket.emit("bid", newBid, room);
      setCurrentBid(newBid);
      updateProduct(newBid);
    } else {
      socket.emit("bid", currentBid, room);
    }
  };
  // teklif miktarını alıyoruz
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setAmount(inputValue);
    setIsDisabled(inputValue <= currentBid.currentBid);
  };

  // socket üzerinden geri dönen teklifi alıyoruz
  useEffect(() => {
    socket.on("reciveBid", (data) => {
      if (currentBid.currentBid < data.currentBid) {
        setCurrentBid(data);
      }

      setDataRecived(data);
    });
  }, [socket]);

  return (
    <div className="flex flex-col sm:flex-row w-full justify-between gap-12 sm:gap-24 ">
      <BidProductInfo product={product} />

      <div className="sm:w-[500px] w-full">
        <h1 className="text-3xl">
          Curret Highest Bid: {currentBid.currentBid} ₺
        </h1>

        <BidForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          amount={amount}
          isDisabled={isDisabled}
          currentBid={currentBid}
        />
        {dataRecived && <BiddersList currentBid={currentBid} />}
      </div>
    </div>
  );
};

export default BidProduct;
