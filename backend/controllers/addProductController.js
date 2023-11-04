const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.addProduct = async (req, res) => {
  const { username, url,description,model,id} = req.body;

  // Find the user in the database
  const user = await User.findOne({ username });

  // Create an array of products if it doesn't exist
  if (!user.products) {
    user.products = [];
  }
  //assemble the product object
  const product = { url, description, model,id };
  
  // Add the new product to the array
  user.products.push(product);

  // Update the user in the database
  await user.save();

  //for each product added , there needs to be a corresponding initial bid data present under "products" tab in database
  const correspondingBidData = await Product.findOne({ model });

  if (!correspondingBidData) {
    // If a corresponding product doesn't exist, create one in the "Product" model
    const newCorrespondingBidData = new Product({
      model: model,
      currentBid: 0,
      lastBidder: null,
      bids: null
    });

    await newCorrespondingBidData.save();
  }

  // Send a success response
  res.status(200).json({ message: "Product added successfully" });
};