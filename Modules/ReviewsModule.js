const mongoose = require("mongoose");

// Define the schema for the review data
const reviewSchema = new mongoose.Schema({
    reviewAtt: String,
    name: String,
    productId: String,
    time: String,
    img: String,
    postUser: String,
    id: String
});

// Create a model from the schema
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;