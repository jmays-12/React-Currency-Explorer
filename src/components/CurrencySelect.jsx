export const DEFAULT_CURRENCIES = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "CAD", symbol: "$" },
    { code: "JPY", symbol: "¥" },
];

export function CurrencySelect({
    label,
    value,
    onChange,
    currencies = DEFAULT_CURRENCIES,
}) {
    return (
        <label>
            {label}:
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.code} {currency.symbol}
                    </option>
                ))}
            </select>
        </label>
    );
}