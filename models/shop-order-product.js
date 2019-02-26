const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopOrderProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  imageLink: String
});

module.exports = mongoose.model("ShopOrderProduct", shopOrderProductSchema);
