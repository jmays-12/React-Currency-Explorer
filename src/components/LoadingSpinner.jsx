export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div
      className="spinner-wrapper"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <span className="spinner" aria-hidden="true" />
      <p className="spinner-message">{message}</p>
    </div>
  );
}
