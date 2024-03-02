const [getNotificationData, postNotificationData, updateNotificationData, deleteNotificationData, targetNotificationData, getSearchNotification] = require("../Controllers/NotificationController")

const express = require("express");
const router = express.Router();

router.get("/notification", (req, res) => getNotificationData(req, res))
    .get("/notification/:slug",targetNotificationData)
    .get("/notificationSearch",getSearchNotification)
    .post("/notification", postNotificationData)
    .patch("/notification/:id", updateNotificationData)
    .delete("/notification/:id", deleteNotificationData);

module.exports = router;