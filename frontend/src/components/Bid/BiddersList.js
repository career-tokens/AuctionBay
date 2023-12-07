import React from "react";

function BiddersList({ currentBid }) {
  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold" style={{color:"green"}}>
        Highest Bidder: {currentBid.lastBidder}
      </h2>
      <div className="mt-4">
        <h2 className="font-semibold text-xl">Last Bids:</h2>
        <ul className="flex flex-col-reverse list-disc list-inside p-2 gap-2">
          {currentBid.bids.map((bid) => (
            <li key={bid.bidder + Math.random() * 20}>
              <span className="text-[darkslategrey] font-bold mr-[4px]">{bid.bidder}</span>{" "}
              Bidded : ₹{bid.bid}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BiddersList;
