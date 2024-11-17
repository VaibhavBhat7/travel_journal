import React from 'react';
import '../styles/Timeline.css';

const Timeline = ({ trips }) => {
    return (
        <div className="timeline">
            {trips.map((trip) => (
                <div className="timeline-item" key={trip._id}>
                    <h3>{trip.title}</h3>
                    <p>{trip.description}</p>
                    <span>{new Date(trip.date).toLocaleDateString()}</span>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
