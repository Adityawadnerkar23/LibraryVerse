const express = require('express');
const router = express.Router();
const Address = require('../models/address');
const Category = require('../models/category');
const app = express();
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

router.post("/post_address", async (req, res) => {
  try {
    console.log("on");
    const userAddress = req.body;
    const new_address = new Address({
      product_name: userAddress.product_name,
      product_price: userAddress.product_price,
      product_quantity: userAddress.product_quantity,
      manufacturing_date: userAddress.manufacturing_date,
      expiry_date: userAddress.expiry_date,
      category: userAddress.selectcategory,
    });
    const result = await new_address.save();
    if (result) {
      return res.status(201).json({ status: 201, message: "Address created", data: result });
    } else {
      return res.status(400).json({ status: 400, message: "Address not created", data: {} });
    }
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).send("Internal Server Error");
  }
});

/////// Category //////////////////////////
router.post("/post_category", async (req, res) => {
  try {
    const usercategory = req.body;
    console.log(usercategory, " user category");
    const new_category = await Category.create({
      Category_name: usercategory.usercategory,
    });
    console.log(new_category, ",,,,,,,,,,");
    if (new_category) {
      return res.status(201).json({ status: 201, message: "Category created", data: new_category });
    } else {
      return res.status(400).json({ status: 400, message: "Category not created", data: {} });
    }
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Deleting a category by ID
router.delete("/delete_category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndDelete(id);  // Fixed: Used 'Category' model
    if (!result) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send("Category deleted successfully");
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetching all categories
router.get('/get_category', async (req, res) => {
  try {
    const result = await Category.find();
    if (result) {
      return res.status(200).json({ status: 200, message: "Categories fetched", data: result });
    } else {
      return res.status(400).json({ status: 400, message: "No categories found", data: {} });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetching products with category details
router.get('/get_products', async (req, res) => {
  try {
    const result = await Address.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
    ]);
    if (result) {
      return res.status(200).json({ status: 200, message: "Products fetched", data: result });
    } else {
      return res.status(400).json({ status: 400, message: "No products found", data: {} });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

router.get('get_socket', (req, res) => {
  res.json({
    message: 'Hello, world!',
  });
});

module.exports = router;
