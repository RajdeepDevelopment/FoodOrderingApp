const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    "First-name": String,
    "Last-name": String,
    phone: String,
    "address-1": String,
    "address-2": String,
    city: String,
    country: String,
    "pin-code": String,
    state: String,
    state2: String,
    userid: String,
    longitide: Number,
    latitude: Number,
    ValidEmail: String,
    logo: String,
    id: Number,
    EmailBox: String
  });
const OutForDeliverySchema = mongoose.Schema({
    for: String,
    DeliveryId: Number,
    Address: [addressSchema], // Use the addressSchema as a subdocument
    longititu: Number,
    latitude: Number,
    totalAmount: Number,
    OrderPlacedTime: String,
    customerName: String,
    currentDelivery: Boolean,
    logo: [String], // Assuming logo can be an array of strings
    id: Number
})

const OutForDelivery = mongoose.model("OutForDelivery", OutForDeliverySchema);
module.exports = OutForDelivery;