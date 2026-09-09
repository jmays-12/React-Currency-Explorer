# Currency Explorer

Currency Explorer is a React application that uses the [Frankfurter API](https://frankfurter.dev) to display currency exchange rates as well as historical data.
Live demo of this app can be found [here.](https://jmays-12.github.io/React-Currency-Explorer)

- **Currency Converter** - Convert an amount between two currencies using live exchange rate data.
- **Historical Rates** - Select a date range and currency pair to view a line chart of exchange rates over time. This feature will automatically scale the request to the API depending on date range size.


## Technologies utilized

- React & React Router
- JavaScript
- CSS
- Recharts
- Frankfurter API

## Setup

1. Clone this repository
2. Open the project folder in your terminal
3. Install dependencies:

    `npm install`

4. Start the development server:

    `npm run dev`

5. Open the local development URL in your browser of choice (usually `http://localhost:5173`)


### API Endpoints used:

- `GET /v2/rate/{base}/{quote}` - fetches the current exchange rate between two currencies (used by the Converter)
- `GET /v2/rates?base={base}&quotes={quote}&from={from}&to={to}` - fetches a time series of daily rates for a date range (used by Historical Rates)

### Known Limitations

- Currency options are currently limited to a small set of common currencies rather than the full list the API supports
- Does not use easy to read number formatting (e.g. $1,000 instead it shows $1000)
