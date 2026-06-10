function Button({
  children,
  variant = "outline",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md border font-semibold transition pf-focus disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    black:
      "border-[var(--pf-black)] bg-[var(--pf-black)] text-white hover:bg-[var(--pf-800)]",
    outline:
      "border-[var(--pf-line-strong)] bg-white text-[var(--pf-900)] hover:bg-[var(--pf-100)]",
    ghost:
      "border-transparent bg-transparent text-[var(--pf-600)] hover:bg-[var(--pf-100)] hover:text-[var(--pf-900)]",
    inverted:
      "border-white bg-white text-[var(--pf-black)] hover:bg-[var(--pf-100)]",
    darkGhost:
      "border-transparent bg-transparent text-[var(--pf-300)] hover:bg-[var(--pf-800)] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;