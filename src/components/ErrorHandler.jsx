export function ErrorHandler({ error }) {
    if (!error) {
        return null;
    }

    return (
        <p className="error" role="alert">
            Error: {error}
        </p>
    );
}