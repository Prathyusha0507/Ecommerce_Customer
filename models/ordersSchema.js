const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*Reference from https://mongoosejs.com/docs/guide.html */
const OrderSchema = new Schema({
  fullName: { type: String },
  user: { type: String },
  deliveryOption: { type: String },
  createdAt: { type: Date, default: Date.now },
  deliveryAddress: { type: String },
  items: [
    {
      productDetails: {
        name: { type: String },
        description: { type: String },
        images: [{ type: String }],
        price: { type: Number },
        quantity: { type: Number },
        seller: { type: String },
      },
      quantity: { type: Number },
    },
  ],
});

module.exports = mongoose.model("orders", OrderSchema);
