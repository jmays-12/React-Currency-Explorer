export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner" />
      <p className="spinner-message">{message}</p>
    </div>
  );
}

export default LoadingSpinner;