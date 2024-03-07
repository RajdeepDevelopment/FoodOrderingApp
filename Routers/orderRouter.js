// const [getOrderData, postOrderData, updateOrderData, deleteOrderData,targetOrderData,getSearchOrders] = require("../Controllers/orderController")
const orderFile = require("../Controllers/orderController")

const express = require("express");
const router = express.Router();

router.get("/order",  orderFile.getOrderData)
    .get("/order/:slug", orderFile.targetOrderData )
    .get("/orderSearch", orderFile.getSearchOrders)
    .post("/order", orderFile.postOrderData)
    .patch("/order/:id", orderFile.updateOrderData)
    .delete("/order", orderFile.deleteOrderData);

module.exports = router;