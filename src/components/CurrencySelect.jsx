export const DEFAULT_CURRENCIES = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "Great British Pound" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "MXN", symbol: "$", name: "Mexican Peso" },
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
                        {currency.code} - {currency.name} {currency.symbol}
                    </option>
                ))}
            </select>
        </label>
    );
}