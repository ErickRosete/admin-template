const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: Number,
  imageLinks: [String],
  videoLink: String,
  shortDescription: String,
  quantity: Number,
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subcategory"
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);
