const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, "Please provide a model"],
  },
  currentBid: {
    type: Number,
    required: [true, "Please provide a currentBid"],
  },
  lastBidder: {
    type: String,
    required: [true, "Please provide a lastBidder"],
  },
  bids: [{ bidder: String, bid: Number }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;