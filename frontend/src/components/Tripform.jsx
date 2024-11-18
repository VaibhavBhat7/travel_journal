import React, { useState } from "react";
import './TripForm.css'; // Make sure the path is correct


const TripForm = ({ addTrip }) => {
  // State variables for form inputs
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the new trip object
    const newTrip = {
      tripName,
      destination,
      description,
      date,
    };
    
    // Call the addTrip function to add the trip
    addTrip(newTrip);
    
    // Reset the form fields after submission
    setTripName("");
    setDestination("");
    setDescription("");
    setDate("");
  };

  return (
    <div className="trip-form-container">
      <h2>Add a New Trip</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Trip Name</label>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Trip Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Save Trip</button>
      </form>
    </div>
  );
};

export default TripForm;
