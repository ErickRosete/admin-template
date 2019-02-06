const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const eventSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true
//     },
//     imageLink:String,
//     shortDescription: String,
//     description: {
//       type: String,
//       required: true
//     },
//     date: {
//       type: Date,
//       required: true
//     },
//     address: {
//       type: Schema.Types.ObjectId,
//       ref: "Address"
//     }
//   },
//   { timestamps: true }
// );

module.exports = mongoose.model("Event", eventSchema);
