const [getCart, postCart, updateCart, deleteCart, targetCart,getSearchCart] = require("../Controllers/cartController")

const express = require("express");
const router = express.Router();

router.get("/cart", (req, res) => getCart(req, res))
    .get("/cart/:slug",targetCart)
    .get("/cartSearch",getSearchCart)
    .post("/cart", postCart)
    .patch("/cart", updateCart)
    .delete("/cart", deleteCart);

module.exports = router;