import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Converter from "./pages/Converter";
import HistoricalRates from "./pages/HistoricalRates";

export function App() {
    return (
        <BrowserRouter>
            <header>
                <h1>Currency Explorer</h1>
                <p className="tagline">Convert between currencies and view historical conversion data</p>
                <nav>
                    <NavLink to="/" end>Converter</NavLink>
                    <NavLink to="/historical">Historical Rates</NavLink>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Converter />} />
                    <Route path="/historical" element={<HistoricalRates />} />
                </Routes>
            </main>

            <footer>
                <p>Exchange rate data provided by the <a href="https://frankfurter.dev" target="_blank" rel="noreferrer">Frankfurter API</a>, sourced from the European Central Bank</p>
            </footer>
        </BrowserRouter>
    );
}
