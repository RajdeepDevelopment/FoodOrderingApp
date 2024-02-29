const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    for: { type: String, required: true },
    uid: { type: String, required: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
    time: { type: Date },
    dbAdd: { type: String, required: true },
    id: { type: Number}
});

const Restaurant = mongoose.model('Restaurants', restaurantSchema);

module.exports = Restaurant;