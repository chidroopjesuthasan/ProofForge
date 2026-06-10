function Tag({ children, mode = "default" }) {
  const modes = {
    default: "border-[var(--pf-line)] bg-white text-[var(--pf-700)]",
    dark: "border-[var(--pf-black)] bg-[var(--pf-black)] text-white",
    soft: "border-[var(--pf-line)] bg-[var(--pf-100)] text-[var(--pf-700)]",
    inverse: "border-[var(--pf-700)] bg-[var(--pf-900)] text-[var(--pf-100)]",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${modes[mode]}`}>
      {children}
    </span>
  );
}

export default Tag;