import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
