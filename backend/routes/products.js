import express from "express";
import Product from "../models/Product";

const router = express.Router();

// GET all Products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log("Got: " + JSON.stringify(products));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single Product by ID
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
    console.log("Got: " + JSON.stringify(product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new Product
router.post("/product", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image_url: req.body.image_url,
  });
  try {
    const newProduct = await Product.save();
    res.status(201).json(newProduct);
    console.log("Added: " + JSON.stringify(product));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a Product by ID
router.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Product found: ", product);
    await Product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting Product:", err);
    res
      .status(500)
      .json({ message: "Failed to delete Product", error: err.message });
  }
});

// PUT (update) a Product by ID
router.put("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Update fields
    product.checkInDate = req.body.checkInDate ?? product.checkInDate;
    product.checkOutDate = req.body.checkOutDate ?? product.checkOutDate;
    product.guestName = req.body.guestName ?? product.guestName;
    product.guestEmail = req.body.guestEmail ?? product.guestEmail;
    product.roomNumber = req.body.roomNumber ?? product.roomNumber;

    const updatedProduct = await Product.save();
    res.json(updatedProduct);
    console.log("Updated: " + JSON.stringify(product));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
