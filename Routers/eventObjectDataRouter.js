const [getEventObjectData,postEventObjectData, updateEventObjectData,deleteEventObjectData,targetEventObjectData] = require("../Controllers/eventObjectDataController")

const express = require("express");
const router = express.Router();

router.get("/EventObjectData", (req, res) => getEventObjectData(req, res))
    .get("/EventObjectData/:slug", targetEventObjectData)
    .post("/EventObjectData", postEventObjectData)
    .patch("/EventObjectData", updateEventObjectData)
    .delete("/EventObjectData", deleteEventObjectData);

module.exports = router;