const express = require('express');
const Trip = require('../models/Trip');
const router = express.Router();

// Get all trips
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new trip
router.post('/', async (req, res) => {
    const trip = new Trip(req.body);
    try {
        const savedTrip = await trip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
