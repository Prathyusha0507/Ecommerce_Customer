const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*Reference from https://mongoosejs.com/docs/guide.html */
const ItemSchema = new Schema({
  name: { type: String },
  description: { type: String },
  images: { type: Array },
  price: { type: Number },
  quantity: { type: Number },
  seller: { type: String },
  category: { type: String },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      userId: { type: String },
      name: { type: String },
      stars: { type: Number },
      text: { type: String },
    },
  ],
});

module.exports = mongoose.model("items", ItemSchema);
