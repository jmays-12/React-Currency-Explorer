const API_URL = "https://api.frankfurter.dev/v2";

export function fetchExchangeRate(base, quote) {
    return fetch(`${API_URL}/rate/${base}/${quote}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
        });
}

export function fetchHistoricalRates(base, quote, from, to) {
    return fetch(
        `${API_URL}/rates?base=${base}&quotes=${quote}&from=${from}&to=${to}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
        });
}