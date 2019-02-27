const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        role:{
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
        },
        mainAddress: {
            type: Schema.Types.ObjectId,
            ref: "Address",
        },
        imageLink:{
            type: String,
        },
        addresses: [{
            type: Schema.Types.ObjectId,
            ref: "Address"
        }],
        delete:{
            type: Boolean,
            default: false,
            required:false
        }
    },
);


module.exports = mongoose.model("User", userSchema);