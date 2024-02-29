const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
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
        EmailBox: String,
        Access: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;