import Panel from "./Panel.jsx";

function MetricCard({ label, value, helper }) {
  return (
    <Panel className="pf-panel-hover border-t-4 border-t-[var(--pf-black)] p-4">
      <p className="text-sm font-semibold text-[var(--pf-600)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--pf-black)]">
        {value}
      </p>
      {helper && (
        <p className="mt-2 text-sm leading-5 text-[var(--pf-500)]">{helper}</p>
      )}
    </Panel>
  );
}

export default MetricCard;