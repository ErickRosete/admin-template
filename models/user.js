const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        birthdate:{
            type: String,
            required: true
        },
        mainAddress: {
            type: Schema.Types.ObjectId,
            ref: "Address",
        },
        addresses: [{
            type: Schema.Types.ObjectId,
            ref: "Address"
        }]
    },
);


module.exports = mongoose.model("User", userSchema);