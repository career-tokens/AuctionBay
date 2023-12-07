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
      const res= await fetch(
        `${process.env.REACT_APP_TO_BACKEND_URL}/users/getproducts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const response = await res.json();
      if (response) {
        setProductList(response);
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
{ currentBid&&product&&<div className="font-[Montserrat] pt-[12vh] sm:pt-[14vh] flex flex-col sm:flex-row w-full justify-between gap-12 sm:gap-24 pb-[2vh]">
      <BidProductInfo product={product}/>

      <div className="w-[500px] sm:w-[600px] w-full px-[2vw] py-[2vh] rounded-xl" style={{
                       backgroundImage: "url('https://imgs.search.brave.com/AhU1iWmvuy8t-lXDtQCBqTgNN6Lw28BdBmI7vmpVo7U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kaWdp/dGFsc3lub3BzaXMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE3LzAyL2JlYXV0/aWZ1bC1jb2xvci1n/cmFkaWVudHMtYmFj/a2dyb3VuZHMtMDAx/LXdhcm0tZmxhbWUu/cG5n')",
                       backgroundSize: "cover", 
      }}>
        <h1 className="text-2xl font-bold uppercase">
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
//https://imgs.search.brave.com/Cfx4aJ7lOg4HaJep38V6446-bKvYIC7ah3Ya4_W8YG8/rs:fit:500:0:0/g:ce/aHR0cDovL3d3dy5p/bnNpZ2h0Ym14LmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/My8wNC9ibGFjay1n/cmFkaWVudC1iYWNr/Z3JvdW5kLTMwMHgy/MjUucG5n