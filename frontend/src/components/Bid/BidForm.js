import React from "react";
import { motion } from "framer-motion";

function BidForm({
  handleSubmit,
  amount,
  handleChange,
  isDisabled,
  currentBid,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-full" >
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
            <motion.button
              className="text-lg  bg-orange-500  disabled:bg-orange-400 disabled:opacity-50  p-2 rounded"
              disabled={isDisabled}
              intial={{ rotate: "0deg" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85, rotate: "2.5deg" } }
              transition={{
                duration: 0.125,
                ease:"easeInOut"
                }}
            >
              {/* {isDisabled ? " disabled" : "Place Bid"} */}
              Place Bid
            </motion.button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BidForm;
