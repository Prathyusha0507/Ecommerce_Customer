var express = require("express");
var router = express.Router();

router.get("/:userId/wishlist", async (req, res, next) => {
  const id = req.params.userId;
  try {
    const wishlist = await Users.find({ _id: id }, { wishlist: 1 });
    res.status(200).send(wishlist);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

router.patch("/:userId/wishlist", async (req, res, next) => {
  const id = req.params.userId;
  const item = req.body;
  try {
    const newItem = await Users.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          wishlist: item,
        },
      },
      { new: true }
    );
    res.status(200).send(newItem);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

router.delete("/:userId/wishlist", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Users.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          wishlist: [],
        },
      }
    );
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

module.exports = router;
