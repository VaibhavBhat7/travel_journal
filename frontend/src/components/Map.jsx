import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import '../styles/Map.css'; // Importing external CSS

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
  const [customMarkers, setCustomMarkers] = useState([]); // State for user-added markers
  const [mapClickDisabled, setMapClickDisabled] = useState(false); // Disable map clicks temporarily

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

  // Component to handle map clicks and add new markers
  const AddMarkerOnClick = () => {
    useMapEvents({
      click: (e) => {
        if (!mapClickDisabled) {
          const { lat, lng } = e.latlng;
          const newMarker = {
            id: Date.now(), // Unique ID for the marker
            position: { lat, lng },
            title: "", // Default empty title
            description: "", // Default empty description
          };
          setCustomMarkers([...customMarkers, newMarker]); // Add marker to the state
        }
      },
    });
    return null; // This component doesn't render anything on the map
  };

  // Function to update a marker's details
  const updateMarker = (id, updatedData) => {
    setCustomMarkers(
      customMarkers.map((marker) =>
        marker.id === id ? { ...marker, ...updatedData } : marker
      )
    );
  };

  // Function to delete a marker
  const deleteMarker = (id) => {
    setMapClickDisabled(true); // Temporarily disable map clicks
    setCustomMarkers(customMarkers.filter((marker) => marker.id !== id));
    setTimeout(() => setMapClickDisabled(false), 100); // Re-enable map clicks after a short delay
  };

  return (
    <MapContainer
      center={userLocation ? [userLocation.lat, userLocation.lng] : [22, 80]} // Center map on user location
      zoom={5}
      className="map-container"
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

      {/* Show custom markers */}
      {customMarkers.map((marker) => (
        <Marker position={[marker.position.lat, marker.position.lng]} key={marker.id}>
          <Popup className="popup-container">
            <label>
              Title:
              <input
                type="text"
                value={marker.title}
                onChange={(e) =>
                  updateMarker(marker.id, { title: e.target.value.toUpperCase() })
                }
                className="popup-title-input"
              />
            </label>
            <label>
              Description:
              <textarea
                value={marker.description}
                onChange={(e) =>
                  updateMarker(marker.id, { description: e.target.value })
                }
                className="popup-description-textarea"
              />
            </label>
            <button
              className="popup-delete-button"
              onClick={() => deleteMarker(marker.id)}
            >
              Delete Marker
            </button>
          </Popup>
        </Marker>
      ))}

      {/* Component to add markers on map click */}
      <AddMarkerOnClick />

      {/* Error handling */}
      {error && <p className="error-text">{error}</p>}
    </MapContainer>
  );
};

export default Map;
