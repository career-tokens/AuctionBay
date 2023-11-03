const User = require("../models/userModel");

exports.getproducts = async (req, res) => {
  try {
    // Fetch all user objects from the MongoDB database
    const users = await User.find({});

    // Extract and merge product arrays from user objects
    const allProducts = users.reduce((mergedProducts, user) => {
      if (user.products && user.products.length > 0) {
        mergedProducts = mergedProducts.concat(user.products);
      }
      return mergedProducts;
    }, []);

    // Send the merged products array as the response
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

  