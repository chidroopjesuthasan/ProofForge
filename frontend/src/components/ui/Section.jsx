function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  dark = false,
}) {
  return (
    <section
      id={id}
      className={`border-b ${
        dark
          ? "border-[var(--pf-line-dark)] bg-[var(--pf-black)] text-white"
          : "border-[var(--pf-line)] bg-white text-[var(--pf-900)]"
      } py-16`}
    >
      <div className="pf-container">
        {(eyebrow || title || description) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className={`text-xs font-black uppercase tracking-[0.2em] ${dark ? "text-[var(--pf-300)]" : "text-[var(--pf-600)]"}`}>
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className={`mt-3 text-3xl font-semibold tracking-tight ${dark ? "text-white" : "text-[var(--pf-black)]"}`}>
                {title}
              </h2>
            )}

            {description && (
              <p className={`mt-3 text-sm leading-6 ${dark ? "text-[var(--pf-300)]" : "text-[var(--pf-600)]"}`}>
                {description}
              </p>
            )}
          </div>
        )}

        {children && <div className={eyebrow || title || description ? "mt-8" : ""}>{children}</div>}
      </div>
    </section>
  );
}

export default Section;