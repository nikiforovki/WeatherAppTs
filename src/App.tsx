import { useState } from 'react';
import './App.module.css';
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

type Coords = { lat: number; lon: number } | null;

function App() {
    const [city, setCity] = useState('Берлин');
    const [coords, setCoords] = useState<Coords>(null);
    const [useGeo, setUseGeo] = useState(false);


    const handleSearch = (newCity: string) => {
        setCity(newCity);
        setUseGeo(false);
        setCoords(null);
    };

    const handleGeoSelect = (lat: number, lon: number) => {
        setCoords({ lat, lon });
        setUseGeo(true);
    };

    return (
        <div className="container">
            <Header onSearch={handleSearch}/>
            <Main
                city={city}
                coords={coords}
                useGeo={useGeo}
                onGeoSelect={handleGeoSelect}

            />
            <Footer
                city={city}
                coords={coords}
                useGeo={useGeo}
            />
        </div>
    );
}

export default App;

