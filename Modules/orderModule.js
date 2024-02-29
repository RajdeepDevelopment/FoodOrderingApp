const mongoose = require('mongoose');

const { Schema } = mongoose;

const AddressSchema = new Schema({
    "First-name": String,
    "Last-name": String,
    "phone": String,
    "address-1": String,
    "address-2": String,
    "city": String,
    "country": String,
    "pin-code": String,
    "state": String,
    "state2": String,
    "userid": String,
    "longitide": Number,
    "latitude": Number,
    "logo": String,
     "id": Number
});

const DeliveryReqSchema = new Schema({
    "First-name": String,
    "Last-name": String,
    "phone": String,
    "address-1": String,
    "address-2": String,
    "city": String,
    "country": String,
    "pin-code": String,
    "state": String,
    "state2": String,
    "userid": String,
    "longitide": Number,
    "latitude": Number,
    "ValidEmail": String,
    "logo": String,
    "id": Number,
    "EmailBox": String,
    "Access": String
});

const OrderProductSchema = new Schema({
    "Size": String,
    "userid": String,
    "spic": String,
    "Cheese": String,
    "quantity": Number,
    "item": {
        "id": Number,
        "name": String,
        "description": String,
        "price": Number,
        "discountPercentage": Number,
        "rating": Number,
        "city": String,
        "ingredients": [String],
        "uid": String,
        "restaurantName": String,
        "thumbnail": String,
        "images": [String],
        "highlights": [String],
        "cuisine": String,
        "category": String,
        "priceRange": String
    },
    "time": String,
    "id": Number
});

const OrderSchema = new Schema({
    "longititu": Number,
    "latitude": Number,
    "totalAmount": Number,
    "status": String,
    "OrderProducts": [OrderProductSchema],
    "OrderPlacedTime": String,
    "Address": [AddressSchema],
    "belngto": String,
    "name": String,
    "DeliveryReq": [DeliveryReqSchema],
    "id": Number,
    "DeliveryReqBy": String,
    "AcceptStatus": String,
    "deliLongitide": Number,
    "deliLatitude": Number
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
