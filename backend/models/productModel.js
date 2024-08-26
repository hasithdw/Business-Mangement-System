import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number, default: 0 },
    category: { type: String, ref: "Category" },
    quantity: { type: Number },
    brand: { type: String },
    countInStock: { type: Number, default: 0 },
    // reviews: [reviewSchema],
    // rating: { type: Number, default: 0 },
    // numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
