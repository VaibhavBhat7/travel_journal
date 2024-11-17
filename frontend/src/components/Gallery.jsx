import React from 'react';
import '../styles/Gallery.css';

const Gallery = ({ trips }) => {
    return (
        <div className="gallery">
            {trips.map((trip) =>
                trip.images.map((img, idx) => (
                    <div className="gallery-item" key={`${trip._id}-${idx}`}>
                        <img src={img} alt={trip.title} />
                    </div>
                ))
            )}
        </div>
    );
};

export default Gallery;
