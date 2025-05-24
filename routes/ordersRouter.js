var express = require("express");
var router = express.Router();
const Orders = require("../models/ordersSchema");
const Users = require("../models/userSchema");

router.post("/", async (req, res, next) => {
  const order = req.body;
  try {
    const newOrder = await Orders.create(order);
    const userId = req.body.user;
    const user = await Users.findById(userId);
    user.orders.push(newOrder._id);
    await user.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userID", async function (req, res) {
  try {
    var userID = req.params.userID;
    const ordersList = await Users.findOne(
      { _id: userID },
      { orders: 1, _id: 0, firstname: 1, lastname: 1 }
    );
    const orders = await Orders.find({ _id: { $in: ordersList.orders } });
    let modifiedOrders = [];
    for (const order of orders) {
      let fullName = `${ordersList.firstname} ${ordersList.lastname}`;
      if (order.fullName) {
        fullName = order.fullName;
      }
      let modOrder = {
        _id: order._id,
        fullName: fullName,
        createdAt: order.createdAt,
        deliveryAddress: order.deliveryAddress,
        items: order.items,
      };
      modifiedOrders.push(modOrder);
    }
    return res.send(modifiedOrders).status(200);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:orderID", async function (req, res) {
  try {
    await Orders.findOneAndDelete({
      _id: req.params.orderID,
    });
    res.status(200).json({ message: "order returned Successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:userID/:itemID", async (req, res, next) => {
  const userID = req.params.userID;
  const itemName = req.params.itemID;
  try {
    const foundOrders = await Orders.find({
      $and: [{ user: userID }, { "items.productDetails.name": itemName }],
    });
    res.status(200).json(foundOrders);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

module.exports = router;
