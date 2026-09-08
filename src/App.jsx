import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Converter from "./pages/Converter";
import HistoricalRates from "./pages/HistoricalRates";

function App() {
    return (
        <BrowserRouter>
            <header>
                <h1>Currency Explorer</h1>
                <p className="tagline">Convert between currencies and view historical conversion data</p>

                <nav>
                    <Link to="/">Converter</Link>
                    <Link to="/historical">Historical Rates</Link>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Converter />} />
                    <Route
                        path="/historical"
                        element={<HistoricalRates />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
