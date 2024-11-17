import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon for user location
const userIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = ({ trips }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError("Unable to fetch location. Please enable location access.");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <MapContainer
      center={userLocation ? [userLocation.lat, userLocation.lng] : [22, 80]} // Center map on user location
      zoom={5}
      style={{ height: "95vh", width: "98vw", borderRadius: "5px" }}
      whenReady={() => {
        if (userLocation) {
          // Center the map once the user's location is available
          const map = document.querySelector('.leaflet-container').__leaflet;
          map.setView([userLocation.lat, userLocation.lng], 13); // You can adjust the zoom level (13 here)
        }
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Show user's location */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <h3>You are here!</h3>
          </Popup>
        </Marker>
      )}

      {/* Show trip locations */}
      {trips.map((trip) => (
        <Marker
          position={[trip.location.lat, trip.location.lng]}
          key={trip._id}
        >
          <Popup>
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
          </Popup>
        </Marker>
      ))}

      {/* Error handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </MapContainer>
  );
};

export default Map;
