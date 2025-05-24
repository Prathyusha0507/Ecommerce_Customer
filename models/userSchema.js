const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*Reference from https://mongoosejs.com/docs/guide.html */
const UserSchema = new Schema({
  _id: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  useremail: { type: String },
  userpassword: { type: String },
  mobile: { type: String },
  address: { type: String },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("users", UserSchema);
