import { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

const API_URL = "https://api.frankfurter.dev/v2";

function fetchExchangeRate(base, quote) {
    return fetch(
        `${API_URL}/rate/${base}/${quote}`
    )
        .then((response) => {
            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        });
}

function Converter() {
    // User selections
    const [amount, setAmount] = useState(1);
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [quoteCurrency, setQuoteCurrency] = useState("EUR");

    // API result
    const [result, setResult] = useState(null);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setError(null);
        setResult(null);

        fetchExchangeRate(
            baseCurrency,
            quoteCurrency
        )
            .then((data) => {
                const convertedAmount =
                    Number(amount) * data.rate;

                setResult(convertedAmount);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <section className="converter">
            <h2>Currency Converter</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Amount:
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amount}
                        onChange={(event) =>
                            setAmount(event.target.value)
                        }
                    />
                </label>

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

                <button type="submit" disabled={loading}>
                    {loading ? "Converting..." : "Convert"}
                </button>
            </form>

            {loading && (
                <LoadingSpinner message="Fetching exchange rate..." />
            )}

            {error && (
                <p className="error">
                    Error: {error}
                </p>
            )}

            {result !== null && !loading && (
                <div className="conversion-result">
                    <h3>Conversion Result</h3>

                    <p>
                        {amount} {baseCurrency} ={" "}
                        <strong>
                            {Number(result).toFixed(2)}{" "}
                            {quoteCurrency}
                        </strong>
                    </p>
                </div>
            )}
        </section>
    );
}

export default Converter;

