import './App.module.css';
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";

function App() {
    return (
        <div className="container"> {/* Оберните элементы в контейнер */}
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;