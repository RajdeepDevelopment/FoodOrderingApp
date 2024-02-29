const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    "message": String,
    "for": String,
    "time": Date,
    "status": String,
    "logo": [String],
    "link": String,
    "buttonData": String
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
