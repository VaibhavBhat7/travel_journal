const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    images: [String], // Array of image URLs
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trip', TripSchema);
