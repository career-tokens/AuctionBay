import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auctionContext } from "../../context/auctionContext/auctionContextProvider";
import { authContext } from "../../context/authContext/authContextProvider";
import { changeProduct, createBid } from "../../lib/product";
import BiddersList from "./BiddersList";
import BidForm from "./BidForm";
import BidProductInfo from "./BidProductInfo";
import axios from "axios";

const BidProduct = ({ socket }) => {
  const { user } = useContext(authContext);
  const [productList, setProductList] = useState([]);//in this case I need to get all the products
  const [amount, setAmount] = useState("");
  const [dataRecieved, setdataRecieved] = useState(null);
  const [currentBid, setCurrentBid] = useState({
    currentBid: 0,
    lastBidder: "",
    bids: [],
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState({});//the specific product will be stored here

  const { getOneProduct, updateProduct } = useContext(auctionContext);

  const updateThings= async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_TO_BACKEND_URL}/users/getproducts`);//get all products
      if (response.status === 200) {
        setProductList(response.data);
      }
    } catch (error) {
      console.error("Error fetching user products:", error);
    }
  };

  // useEffect(() => {
  //   updateProductList();//call the function to get the products
  // }, []);//later the function is called


  //getting initial data from db
  useEffect(() => {
    updateThings();//call the function to get the products
  }, []);
  useEffect(() => {
    const item = productList.filter((item) => item.id === id).pop()
    setProduct({...item})
  },[productList])

  // join room
  useEffect(() => {
    if(product!=null)
    {
      getOneProduct(product.model, socket);
      socket.emit("join", product.model, (msg) => console.log(msg));

    return () => {
      socket.emit("leave", product.model, (msg) => console.log(msg));
      };
    }
  }, [product]);

  


  // sending data to socket and update product in db
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBid = createBid(product, currentBid, user, amount);
    if (newBid.currentBid > currentBid.currentBid) {
      socket.emit("bid", newBid, product.model);
      setCurrentBid(newBid);
      updateProduct(newBid);
    } else {
      socket.emit("bid", currentBid, product.model);
    }
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setAmount(inputValue);
    setIsDisabled(inputValue <= currentBid.currentBid);
  };

  useEffect(() => {
    console.log("socket=",socket)
    socket.on("recieveBid", (data) => {
      if (data&&currentBid.currentBid < data.currentBid) {
        setCurrentBid(data);
      }

      setdataRecieved(data);
    });
  }, [socket]);


  return (<>
{ currentBid&&product&&<div className="flex flex-col sm:flex-row w-full justify-between gap-12 sm:gap-24 ">
      <BidProductInfo product={product}/>

      <div className="sm:w-[500px] w-full">
        <h1 className="text-3xl">
          Current Highest Bid: ₹{currentBid.currentBid} 
        </h1>

        <BidForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          amount={amount}
          isDisabled={isDisabled}
          currentBid={currentBid}
        />
        {dataRecieved && <BiddersList currentBid={currentBid} />}
      </div>
    </div>}
    </>
  );
};

export default BidProduct;
