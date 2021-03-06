const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
    {
        street: {
            type: String,
            required: true
        },
        exteriorNumber:{
            type: Number,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        zipCode:{
            type: Number,
            required: true
        }
    },
);


module.exports = mongoose.model("Address", addressSchema);