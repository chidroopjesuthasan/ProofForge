function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7f1d1d]">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#2f2420]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7a665e]">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export default PageHeader;