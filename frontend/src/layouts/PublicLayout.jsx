import { Outlet } from "react-router-dom";
import PublicNav from "../components/navigation/PublicNav.jsx";

function PublicLayout() {
  return (
    <main className="min-h-screen bg-white">
      <PublicNav />
      <Outlet />

      <footer className="border-t border-[var(--pf-line)] bg-white">
        <div className="pf-container grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--pf-black)] text-sm font-black text-white">
                PF
              </div>
              <p className="font-black text-[var(--pf-black)]">ProofForge</p>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--pf-600)]">
              Monochrome evidence-backed project verification for candidates,
              mentors, colleges, recruiters, and hiring teams.
            </p>
          </div>

          {[
            ["Platform", ["Evidence Ledger", "Source Scanner", "Dossier Engine", "Verification Workspace"]],
            ["Standards", [".pf.ignore", ".proofmark", "Proof Strength", "Risk Notes"]],
            ["Build", ["Phase 03 UI", "Phase 04 Auth", "MVP-first", "Enterprise later"]],
          ].map(([title, items]) => (
            <div key={title}>
              <p className="text-sm font-black text-[var(--pf-black)]">{title}</p>
              <div className="mt-3 space-y-2 text-sm text-[var(--pf-600)]">
                {items.map((item) => <p key={item}>{item}</p>)}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}

export default PublicLayout;