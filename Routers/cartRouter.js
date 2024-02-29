const [getCart, postCart, updateCart, deleteCart, targetCart] = require("../Controllers/cartController")

const express = require("express");
const router = express.Router();

router.get("/cart", (req, res) => getCart(req, res))
    .get("/cart/:slug",targetCart)
    .post("/cart", postCart)
    .patch("/cart", updateCart)
    .delete("/cart", deleteCart);

module.exports = router;