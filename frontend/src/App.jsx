import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from './components/Map';
import Gallery from './components/Gallery';
import Nav from './components/Nav';
import Timeline from './components/Timeline';
import Stats from './components/Stats';
import GetUserLocation from "./components/GetUserLocation";

const App = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/trips').then((response) => {
            setTrips(response.data);
        });
    }, []);

    return (
        <div>
            {/* <h1>Travel Log</h1> */}
            <Nav/>            
            <GetUserLocation />
            <Map trips={trips} />
            <Gallery trips={trips} />
            <Timeline trips={trips} />
            <Stats trips={trips} />
        </div>
    );
};

export default App;
