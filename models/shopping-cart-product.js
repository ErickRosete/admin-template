const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartProductSchema = new Schema(
    {
        product: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        quantity: {
            type: Number,
            required: true
        }
    },
);


module.exports = mongoose.model("ShoppingCartProduct", shoppingCartProductSchema);