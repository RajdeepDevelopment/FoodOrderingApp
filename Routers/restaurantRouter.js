const express = require("express");
const [getRestaurantsData, postRestaurantData, updateRestaurantData, deleteRestaurantData, targetRestaurantData] = require("../Controllers/restaurantController")

const router = express.Router();

router.get("/restaurants", getRestaurantsData)
    .get("/restaurants/:slug",targetRestaurantData)
    .post("/restaurants", postRestaurantData)
    .patch("/restaurants", updateRestaurantData)
    .delete("/restaurants", deleteRestaurantData);

module.exports = router;
