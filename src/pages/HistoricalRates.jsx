import { useState } from "react";

import { LoadingSpinner } from "../components/LoadingSpinner";
import { fetchHistoricalRates } from "../api/frankfurter";
import { CurrencySelect } from "../components/CurrencySelect";
import { ErrorHandler } from "../components/ErrorHandler";
import { RatesChart } from "../components/RatesChart";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

function getGrouping(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    //convert result in milliseconds to days
    const days = (end - start) / MILLISECONDS_PER_DAY;


    if (days <= 365) {
        return null;
    }

    if (days <= 365 * 3) {
        return "week";
    }

    return "month";
}

function HistoricalRates() {
    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [quoteCurrency, setQuoteCurrency] = useState("EUR");

    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState("2026-01-01");

    const [rates, setRates] = useState([]);
    const [group, setGroup] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();

        if (startDate > endDate) {
            setError("Start date must be before end date.");
            return;
        }

        if (baseCurrency === quoteCurrency) {
            setError("Please choose two different currencies.");
            return;
        }

        const selectedGroup = getGrouping(startDate, endDate);

        setGroup(selectedGroup);
        setLoading(true);
        setError(null);
        setRates([]);

        fetchHistoricalRates(
            baseCurrency,
            quoteCurrency,
            startDate,
            endDate,
            selectedGroup
        )
            .then((data) => {
                setRates(data);
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
            <h2>Historical Conversion Data</h2>

            <form onSubmit={handleSubmit}>
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
                    {loading ? "Fetching..." : "Get Exchange Rates"}
                </button>
            </form>

            {loading && (
                <LoadingSpinner message="Fetching rates..." />
            )}

            <ErrorHandler error={error} />

            {rates.length > 0 && !loading && (
                <section className="results">
                    <h2>
                        {baseCurrency} to {quoteCurrency}
                    </h2>

                    <p>
                        Found {rates.length} exchange rate datapoints
                    </p>

                    {group && (
                        <p className="grouping-message">
                            Large date range: Showing {group}ly exchange rates to keep chart responsive
                        </p>
                    )}

                    <RatesChart
                        rates={rates}
                        baseCurrency={baseCurrency}
                        quoteCurrency={quoteCurrency}
                    />

                    <details className="raw-data">
                        <summary>Raw data (click to expand)</summary>

                        <div className="raw-data-list">
                            {rates.map((rate) => (
                                <p key={rate.date}>
                                    {rate.date}: {rate.rate}
                                </p>
                            ))}
                        </div>
                    </details>
                </section>
            )}
        </section>
    );
}

export default HistoricalRates;