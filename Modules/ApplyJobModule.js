const mongoose = require("mongoose");

// Define the schema for the job data
const jobSchema = new mongoose.Schema({
    title: String,
    department: String,
    location: String,
    salary: String,
    skills: [String],
    firstName: String,
    lastName: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    country: String,
    pinCode: String,
    state: String,
    state2: String,
    userId: String,
    longitude: Number,
    latitude: Number,
    validEmail: String,
    logo: String,
    id: Number,
    time: Date
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;