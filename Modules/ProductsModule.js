const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    reviewCount: Number,
    rating: Number,
    uid: String,
    restaurantName: String,
    ingredients: [String],
    thumbnail: String,
    images: [String],
    highlights: [String],
    cuisine: String,
    city: String,
    category: String,
    priceRange: String,
    VisibleStatus: Boolean ||String,
    weight: {
        Small: String,
        Regular: String,
        Large: String
    }
});

// Create a model from the schema
const Postproduct = mongoose.model("Product", productSchema);

module.exports = Postproduct;