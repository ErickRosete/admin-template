const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: Number,
        categories: [{
            type: Schema.Types.ObjectId,
            ref: "Category"
        }]
    },
);

module.exports = mongoose.model("Product", productSchema);