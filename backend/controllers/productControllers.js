const Product = require("../models/productModel");

// Function to retrieve all products
exports.getAllProducts = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();
    // Return product as an JSON response
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

// Function to retrieve a specific product
exports.getProduct = async (req, res) => {
  const query = { model: req.params.model };

  try {
    const product = await Product.findOne(query);
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Function to update a product
exports.updateProduct = async (req, res) => {
  console.log(req.body.model);
  const query = { model: req.body.model };
  try {
    // Update the product in the database
    const product = await Product.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// create a product but it's not used in the app just here if we want to add a product to the database
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

// it deletes a product from the database but  it's not used in the app
exports.deleteProduct = async (req, res) => {
  const query = { model: req.params.model };
  try {
    const product = await Product.findOneAndDelete(query);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};