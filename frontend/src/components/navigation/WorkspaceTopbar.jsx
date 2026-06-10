import { useState } from "react";
import { Link } from "react-router-dom";
import { workspaceGroups } from "../../data/proofForgeContent.js";
import Button from "../ui/Button.jsx";

function WorkspaceTopbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--pf-line-dark)] bg-[var(--pf-black)] text-white">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-sm font-black text-[var(--pf-black)]">
              PF
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-black">ProofForge</p>
              <p className="text-xs text-[var(--pf-400)]">Evidence workspace</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {[
              ["Command", "/dashboard"],
              ["Projects", "/projects"],
              ["Dossiers", "/reports"],
              ["Settings", "/settings"],
            ].map(([label, href]) => (
              <Link
                key={href}
                to={href}
                className="rounded-md px-3 py-2 text-sm font-bold text-[var(--pf-300)] hover:bg-[var(--pf-850)] hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden w-full max-w-md rounded-md border border-[var(--pf-line-dark)] bg-[var(--pf-900)] px-3 py-1.5 text-sm text-[var(--pf-400)] md:block">
          Search projects, evidence, proofmarks, dossiers...
        </div>

        <div className="flex items-center gap-2">
          <Button variant="inverted" size="sm">New Project</Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-md border border-[var(--pf-line-dark)] bg-[var(--pf-900)] px-3 py-1.5 text-xs font-bold text-[var(--pf-200)] hover:bg-[var(--pf-850)]"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--pf-line-dark)] bg-[var(--pf-black)] text-white xl:hidden">
          <div className="grid gap-4 p-4 md:grid-cols-3">
            {workspaceGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-lg border border-[var(--pf-line-dark)] bg-[var(--pf-900)] p-3"
              >
                <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--pf-500)]">
                  {group.title}
                </p>

                <div className="mt-2 space-y-1">
                  {group.items.map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-bold text-[var(--pf-300)] hover:bg-[var(--pf-850)] hover:text-white"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default WorkspaceTopbar;