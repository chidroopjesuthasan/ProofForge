import Button from "./Button.jsx";

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-xl border border-dashed border-[#d8c7bd] bg-white/70 p-10 text-center">
      <h3 className="text-lg font-semibold text-[#2f2420]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#7a665e]">
        {description}
      </p>

      {actionLabel && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;