import React from 'react';

const Stats = ({ trips }) => {
    const totalTrips = trips.length;
    const countriesVisited = new Set(trips.map((trip) => trip.location.country)).size;

    return (
        <div className="stats">
            <h3>Trip Statistics</h3>
            <p>Total Trips: {totalTrips}</p>
            <p>Countries Visited: {countriesVisited}</p>
        </div>
    );
};

export default Stats;
