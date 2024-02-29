const mongoose = require('mongoose');

// Define the schema
const cartSchema = new mongoose.Schema({
    Size: String,
    userid: String,
    spic: String,
    Cheese: String,
    quantity: String,
    item: {
        id: Number,
        name: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        ingredients: [String],
        uid: String,
        restaurantName: String,
        thumbnail: String,
        images: [String],
        highlights: [String],
        city: String,
        cuisine: String,
        category: String,
        priceRange: String,
        VisibleStatus: Boolean,
        index: Number
    },
    time: String,
    id: Number
});

// Create a model from the schema
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;