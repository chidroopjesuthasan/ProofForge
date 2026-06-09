function Card({ children, className = "" }) {
  return (
    <div className={`pf-card rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

export default Card;