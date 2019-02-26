const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopOrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    shopOrderAddress: {
      type: Schema.Types.ObjectId,
      ref: "ShopOrderAddress"
    },
    shopOrderProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "ShopOrderProduct"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShopOrder", shopOrderSchema);
