import Button from "../ui/Button.jsx";

function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#eadfd7] bg-[#fffaf5]/86 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7f1d1d]">
            ProofForge v2
          </p>
          <h2 className="text-lg font-semibold text-[#2f2420]">
            Candidate Workspace
          </h2>
        </div>

        <div className="hidden w-full max-w-md rounded-lg border border-[#eadfd7] bg-white px-3 py-2 text-sm text-[#8b756c] md:block">
          Search projects, evidence, reports...
        </div>

        <Button size="sm">New Dossier</Button>
      </div>
    </header>
  );
}

export default Topbar;