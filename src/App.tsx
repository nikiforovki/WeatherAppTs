import { useState } from 'react';
import './App.module.css';
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

function App() {
    const [city, setCity] = useState('Берлин');
    return (
        <div className="container">
            <Header onSearch={setCity}/>
            <Main city={city}/>
            <Footer city={city} />
        </div>
    );
}

export default App;