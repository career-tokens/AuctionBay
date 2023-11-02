import React from "react";

function BiddersList({ currentBid }) {
  return (
    <div className="my-4">
      <h2 className="text-lg font-medium text-blue-600 ">
        Highest Bidder: {currentBid.lastBidder}
      </h2>
      <div className="mt-4">
        <h2 className="font-medium ">LastBids:</h2>
        <ul className="flex flex-col-reverse list-disc list-inside p-2 gap-2">
          {currentBid.bids.map((bid) => (
            <li key={bid.bidder + Math.random() * 20}>
              <span className="text-orange-700 font-medium">{bid.bidder}</span>{" "}
              Bidded : {bid.bid} ₺
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BiddersList;
