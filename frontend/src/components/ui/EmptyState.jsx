function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--pf-line-strong)] bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--pf-line)] bg-[var(--pf-100)] text-sm font-black text-[var(--pf-black)]">
        PF
      </div>

      <h3 className="mt-4 text-lg font-semibold text-[var(--pf-black)]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--pf-600)]">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;