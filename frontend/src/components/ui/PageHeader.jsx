function PageHeader({ eyebrow, title, description, action, tabs }) {
  return (
    <div className="border-b border-[var(--pf-line)]">
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5">
        <div>
          {eyebrow && (
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--pf-600)]">
              {eyebrow}
            </p>
          )}

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--pf-black)]">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--pf-600)]">
              {description}
            </p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {tabs && (
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href={tab.href}
              className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-semibold ${
                tab.active
                  ? "border-[var(--pf-black)] text-[var(--pf-black)]"
                  : "border-transparent text-[var(--pf-500)] hover:border-[var(--pf-300)] hover:text-[var(--pf-black)]"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default PageHeader;