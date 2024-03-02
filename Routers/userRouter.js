const express = require("express");
const [getUserData,postUserData,updateUserData,deleteUserData, targetUserData,getSearchUsers] = require("../Controllers/userController")

const router = express.Router();

router.get("/user", getUserData)
    .get("/user/:slug", targetUserData )
    .get("/userSearch", getSearchUsers )
    .post("/user", postUserData)
    .patch("/user", updateUserData)
    .delete("/user", deleteUserData);

module.exports = router;
