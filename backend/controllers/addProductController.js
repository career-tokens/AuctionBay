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

  // Send a success response
  res.status(200).json({ message: "Product added successfully" });
};