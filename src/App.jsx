import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { LoadingSpinner } from './components/LoadingSpinner'

const API_URL = "https://api.frankfurter.dev/v2"

function fetchApi(base, quote, from, to) {
    return fetch(
        `${API_URL}/rates?base=${base}&quotes=${quote}&from=${from}&to=${to}`
    )
        .then(response => {
            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        });
}


function App() {
    // User selections
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [quoteCurrency, setQuoteCurrency] = useState("EUR");

    // Dates for historical data
    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState("2025-12-31");

    // API results
    const [rates, setRates] = useState([]);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setError(null);
        setRates([]);

        fetchApi(baseCurrency, quoteCurrency, startDate, endDate)
            .then(data => {
                setRates(data);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return (
        <main>
            <h1>Currency Explorer</h1>

            <section className="converter">
                <h2>Historical Conversion Data</h2>

                <form onSubmit={handleSubmit}>

                    <label>
                        From:
                        <select
                            value={baseCurrency}
                            onChange={(event) =>
                                setBaseCurrency(event.target.value)
                            }
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="CAD">CAD</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </label>


                    <label>
                        To:
                        <select
                            value={quoteCurrency}
                            onChange={(event) =>
                                setQuoteCurrency(event.target.value)
                            }
                        >
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="CAD">CAD</option>
                            <option value="JPY">JPY</option>
                        </select>
                    </label>


                    <label>
                        Start date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(event) =>
                                setStartDate(event.target.value)
                            }
                        />
                    </label>


                    <label>
                        End date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(event) =>
                                setEndDate(event.target.value)
                            }
                        />
                    </label>


                    <button type="submit" disabled={loading}>
                        {loading ? "..." : "Get Exchange Rates"}
                    </button>

                </form>
            </section>


            {loading && <LoadingSpinner message="Fetching rates..." />}

            {error && (
                <p className="error">
                    Error: {error}
                </p>
            )}


            {rates.length > 0 && (
                <section className="results">
                    <h2>
                        {baseCurrency} to {quoteCurrency}
                    </h2>

                    <p>
                        Found {rates.length} exchange rates.
                    </p>

                    {/* Chart will go here */}

                    <div>
                        <h3>Raw data</h3>

                        {rates.map((rate) => (
                            <p key={rate.date}>
                                {rate.date}: {rate.rate}
                            </p>
                        ))}
                    </div>
                </section>
            )}
        </main>
    )
}

export default App
