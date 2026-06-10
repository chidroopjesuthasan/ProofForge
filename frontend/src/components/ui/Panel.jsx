function Panel({ children, className = "", dark = false }) {
  return (
    <div
      className={`rounded-lg ${
        dark ? "pf-panel-dark" : "pf-panel"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Panel;