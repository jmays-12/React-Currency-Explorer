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

export function fetchHistoricalRates(
    base,
    quote,
    from,
    to,
    group = null
) {
    const params = new URLSearchParams({
        base,
        quotes: quote,
        from,
        to,
    });

    if (group) {
        params.set("group", group);
    }

    return fetch(`${API_URL}/rates?${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return response.json();
        });
}