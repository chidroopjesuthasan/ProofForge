function LedgerTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--pf-line)] bg-white">
      {rows.map((row, index) => (
        <div
          key={`${row[0]}-${index}`}
          className="grid gap-3 border-b border-[var(--pf-line)] p-4 last:border-b-0 md:grid-cols-[1fr_2fr_auto]"
        >
          <p className="font-semibold text-[var(--pf-black)]">{row[0]}</p>

          <p className="text-sm leading-6 text-[var(--pf-600)]">
            {row[1]}
          </p>

          <span className="h-fit rounded-full border border-[var(--pf-line)] bg-[var(--pf-100)] px-2.5 py-1 text-xs font-bold text-[var(--pf-700)]">
            {row[2]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default LedgerTable;