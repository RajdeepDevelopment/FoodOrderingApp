const [getOrderData, postOrderData, updateOrderData, deleteOrderData,targetOrderData] = require("../Controllers/orderController")

const express = require("express");
const router = express.Router();

router.get("/order", (req, res) => getOrderData(req, res))
    .get("/order/:slug", targetOrderData )
    .post("/order", postOrderData)
    .patch("/order/:id", updateOrderData)
    .delete("/order", deleteOrderData);

module.exports = router;