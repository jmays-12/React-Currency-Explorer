import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export function RatesChart({ rates, baseCurrency, quoteCurrency }) {
    // Recharts needs plain objects -'rates' already is [{date, rate}] so this works directly
    // But we thin out the x-axis labels if there are a lot of data points
    const tickInterval = Math.floor(rates.length / 6);

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={rates}
                    margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11 }}
                        interval={tickInterval}
                    />

                    <YAxis
                        domain={["auto", "auto"]}
                        tick={{ fontSize: 11 }}
                        width={60}
                        tickFormatter={(value) => value.toFixed(4)}
                    />

                    <Tooltip
                        formatter={(value) => [
                            value.toFixed(6),
                            `${baseCurrency} to ${quoteCurrency}`,
                        ]}
                        labelFormatter={(label) => `Date: ${label}`}
                    />

                    <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#2f6f4f"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}