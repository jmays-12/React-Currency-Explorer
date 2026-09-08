import { useState } from "react";

import { LoadingSpinner } from "../components/LoadingSpinner";
import { fetchExchangeRate } from "../api/frankfurter";
import {
    DEFAULT_CURRENCIES,
    CurrencySelect,
} from "../components/CurrencySelect";
import { ErrorHandler } from "../components/ErrorHandler";

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

    // Find currency information for the selected currencies
    const baseCurrencyInfo = DEFAULT_CURRENCIES.find(
        (currency) => currency.code === baseCurrency
    );

    const quoteCurrencyInfo = DEFAULT_CURRENCIES.find(
        (currency) => currency.code === quoteCurrency
    );

    function handleSubmit(event) {
        event.preventDefault();

        const numericAmount = Number(amount);

        if (!amount || numericAmount < 0) {
            setError("Please enter a valid amount.");
            return;
        }

        if (baseCurrency === quoteCurrency) {
            setError("Please choose two different currencies.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        fetchExchangeRate(baseCurrency, quoteCurrency)
            .then((data) => {
                const convertedAmount =
                    numericAmount * data.rate;

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

                <CurrencySelect
                    label="From"
                    value={baseCurrency}
                    onChange={setBaseCurrency}
                />

                <CurrencySelect
                    label="To"
                    value={quoteCurrency}
                    onChange={setQuoteCurrency}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Converting..." : "Convert"}
                </button>
            </form>

            {loading && (
                <LoadingSpinner message="Fetching exchange rate..." />
            )}

            <ErrorHandler error={error} />

            {result !== null && !loading && (
                <div className="conversion-result">
                    <h3>Conversion Result</h3>

                    <p>
                        {baseCurrencyInfo.symbol}
                        {amount} {baseCurrency} ={" "}
                        <strong>
                            {quoteCurrencyInfo.symbol}
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