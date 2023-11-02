import React from "react";

function BidForm({
  handleSubmit,
  amount,
  handleChange,
  isDisabled,
  currentBid,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-6 mt-6">
          <div className="flex flex-col w-full gap-2">
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              required
              className="rounded border-2 border-gray-300 p-2 w-full"
            />
            (Enter a number greater than {currentBid.currentBid})
            <button
              className="text-lg  bg-orange-400 hover:bg-orange-500 disabled:bg-orange-400 disabled:opacity-50  p-2 rounded"
              disabled={isDisabled}
            >
              {/* {isDisabled ? " disabled" : "Place Bid"} */}
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BidForm;
