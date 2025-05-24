var express = require("express");
var router = express.Router();
const Items = require("../models/itemSchema");

router.get("/", async (req, res, next) => {
  try {
    let itemData = await Items.find({});

    itemData = filterByCategory(itemData);
    itemData = filterByPrice(itemData);
    itemData = filterByRating(itemData);
    itemData = filterBySearchText(itemData);

    res.status(200).send(itemData);
  } catch (err) {
    console.log(err);
  }

  function filterBySearchText(itemData) {
    let searchParams = req.query.search;
    if (searchParams !== undefined) {
      itemData = itemData.filter((item) => {
        return item.name.toUpperCase().includes(searchParams.toUpperCase());
      });
    }
    return itemData;
  }

  function filterByRating(itemData) {
    let ratingParams = req.query.rating;
    if (ratingParams !== undefined) {
      if (!Array.isArray(ratingParams)) {
        ratingParams = [ratingParams];
      }
      itemData = itemData.filter((item) => {
        if (item.rating < 1) {
          return ratingParams.includes("Below1");
        } else if (item.rating >= 1 && item.rating < 2) {
          return ratingParams.includes("1~2");
        } else if (item.rating >= 2 && item.rating < 3) {
          return ratingParams.includes("2~3");
        } else if (item.rating >= 3 && item.rating < 4) {
          return ratingParams.includes("3~4");
        } else if (item.rating > 4) {
          return ratingParams.includes("Above4");
        }
        return false;
      });
    }
    return itemData;
  }

  function filterByPrice(itemData) {
    let priceParams = req.query.price;
    if (priceParams !== undefined) {
      if (!Array.isArray(priceParams)) {
        priceParams = [priceParams];
      }
      itemData = itemData.filter((item) => {
        if (item.price < 25) {
          return priceParams.includes("Under$25");
        } else if (item.price >= 25 && item.price < 50) {
          return priceParams.includes("$25~$50");
        } else if (item.price >= 50 && item.price < 100) {
          return priceParams.includes("$50~$100");
        } else if (item.price >= 100 && item.price < 200) {
          return priceParams.includes("$100~$200");
        } else if (item.price > 200) {
          return priceParams.includes("Above$200");
        }
        return false;
      });
    }
    return itemData;
  }

  function filterByCategory(itemData) {
    let categoryParams = req.query.category;
    if (categoryParams !== undefined) {
      if (!Array.isArray(categoryParams)) {
        categoryParams = [categoryParams];
      }
      itemData = itemData.filter((item) =>
        categoryParams.includes(item.category)
      );
    }
    return itemData;
  }
});

router.get("/:category", async (req, res, next) => {
  const requestedCategory = req.params.category;
  try {
    const itemData = await Items.find({ category: requestedCategory });
    res.status(200).send(itemData);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
});

router.get("/:itemId", async function (req, res, next) {
  try {
    const item = await Items.find({
      _id: req.params.itemId,
    });
    res.status(200).json(item[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.patch("/:itemId", async function (req, res, next) {
  try {
    const updatedItem = await Items.findOneAndUpdate(
      { _id: req.params.itemId },
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          quantity: req.body.quantity,
          rating: req.body.rating,
          price: req.body.price,
          description: req.body.description,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async function (req, res, next) {
  const item = req.body;
  try {
    const newItem = await Items.create(item);
    res.status(201).send(newItem);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:itemId", async function (req, res, next) {
  try {
    const item = await Items.findOneAndDelete({
      _id: req.params.itemId,
    });
    res.status(200).json({ message: "Product deleted Successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// mongodb aggregate: https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#std-label-set-add-element-to-array
// average rating: https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/
router.patch("/review/:itemId", async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    const reviewObject = req.body;
    const updatedItem = await Items.findOneAndUpdate(
      { _id: itemId },
      [
        {
          $set: {
            reviews: { $concatArrays: ["$reviews", [reviewObject]] },
          },
        },
        {
          $set: {
            rating: { $avg: "$reviews.stars" },
          },
        },
        {
          $set: {
            rating: { $round: ["$rating", 1] },
          },
        },
      ],
      { new: true }
    );
    res.status(200).send(updatedItem);
  } catch (e) {
    res.status(400).send({ err: e.message });
  }
});

module.exports = router;
