function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg border font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "border-[#7f1d1d] bg-[#fffaf5] text-[#7f1d1d] hover:bg-[#7f1d1d] hover:text-white",
    secondary:
      "border-[#eadfd7] bg-white text-[#3a2b26] hover:border-[#c9a39d] hover:bg-[#fff4ea]",
    ghost:
      "border-transparent bg-transparent text-[#6b4e45] hover:border-[#eadfd7] hover:bg-white",
    danger:
      "border-[#b91c1c] bg-white text-[#b91c1c] hover:bg-[#b91c1c] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
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