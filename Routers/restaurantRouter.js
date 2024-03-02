const express = require("express");
const [getRestaurantsData, postRestaurantData, updateRestaurantData, deleteRestaurantData, targetRestaurantData,getSearchRestaurant] = require("../Controllers/restaurantController")

const router = express.Router();

router.get("/restaurants", getRestaurantsData)
    .get("/restaurants/:slug",targetRestaurantData)
    .get("/restaurantsSearch",getSearchRestaurant)
    .post("/restaurants", postRestaurantData)
    .patch("/restaurants", updateRestaurantData)
    .delete("/restaurants", deleteRestaurantData);

module.exports = router;
