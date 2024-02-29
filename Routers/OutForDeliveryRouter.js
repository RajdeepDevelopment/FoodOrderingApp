const [getOutForDeliveryData,getTargetOutForDeliveryData, postOutForDeliveryData, updateOutForDeliveryData,deleteOutForDeliveryData] = require("../Controllers/OutForDeliveryController")

const express = require("express");
const router = express.Router();

router.get("/OutForDelivery",(req, res)=> getOutForDeliveryData(req, res))
.get("/OutForDelivery/:slug", getTargetOutForDeliveryData)
.post("/OutForDelivery",postOutForDeliveryData)
.patch("/OutForDelivery",updateOutForDeliveryData)
.delete("/OutForDelivery",deleteOutForDeliveryData);

module.exports= router;
