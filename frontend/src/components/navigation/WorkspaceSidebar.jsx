import { NavLink } from "react-router-dom";
import { workspaceGroups } from "../../data/proofForgeContent.js";

function WorkspaceSidebar() {
  return (
    <aside className="hidden w-76 shrink-0 border-r border-[var(--pf-line-dark)] bg-[var(--pf-black)] text-white lg:block">
      <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-4 pf-dark-scrollbar">
        <div className="rounded-lg border border-[var(--pf-line-dark)] bg-[var(--pf-900)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--pf-400)]">
            ProofForge MVP
          </p>

          <p className="mt-2 text-sm font-black text-white">
            Candidate proof pipeline
          </p>

          <p className="mt-2 text-xs leading-5 text-[var(--pf-300)]">
            Project → Evidence → Upload → File Scan → AI Analysis → Dossier.
          </p>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--pf-line-dark)] bg-[var(--pf-950)] p-3">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--pf-500)]">
            Workspace Mode
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-[var(--pf-line-dark)] bg-[var(--pf-850)] px-3 py-2">
              <p className="text-xs font-bold text-white">MVP</p>
              <p className="mt-1 text-[11px] text-[var(--pf-400)]">Active</p>
            </div>

            <div className="rounded-md border border-[var(--pf-line-dark)] bg-[var(--pf-850)] px-3 py-2">
              <p className="text-xs font-bold text-white">Local</p>
              <p className="mt-1 text-[11px] text-[var(--pf-400)]">Dev DB</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 space-y-7">
          {workspaceGroups.map((group) => (
            <div key={group.title}>
              <p className="px-2 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--pf-500)]">
                {group.title}
              </p>

              <div className="mt-2 space-y-1">
                {group.items.map(([label, path]) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-md border px-3 py-2.5 text-sm font-bold transition ${
                        isActive
                          ? "pf-sidebar-link-active"
                          : "pf-sidebar-link border-transparent"
                      }`
                    }
                  >
                    <span>{label}</span>
                    <span className="text-xs opacity-60">›</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-8 border-t border-[var(--pf-line-dark)] pt-5">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--pf-500)]">
            Build Rule
          </p>

          <p className="mt-2 text-xs leading-5 text-[var(--pf-300)]">
            Do not add enterprise company features before the candidate dossier flow is stable.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default WorkspaceSidebar;