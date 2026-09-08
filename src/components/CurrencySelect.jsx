const DEFAULT_CURRENCIES = ["USD", "EUR", "GBP", "CAD", "JPY"];

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
                {currencies.map((code) => (
                    <option key={code} value={code}>
                        {code}
                    </option>
                ))}
            </select>
        </label>
    );
}