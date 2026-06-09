import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Projects", path: "/projects" },
  { label: "Reports", path: "/reports" },
  { label: "Settings", path: "/settings" },
];

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-68 border-r border-[#eadfd7] bg-[#fff7ef]/90 px-4 py-5 lg:block">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#7f1d1d] bg-[#fffaf5] text-sm font-bold text-[#7f1d1d]">
          PF
        </div>

        <div>
          <h1 className="text-base font-semibold text-[#2f2420]">ProofForge</h1>
          <p className="text-xs text-[#8b756c]">Proof dossiers</p>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg border px-3 py-2 text-sm transition ${
                isActive
                  ? "border-[#d9b1ab] bg-[#fff0ed] text-[#7f1d1d]"
                  : "border-transparent text-[#6b4e45] hover:border-[#eadfd7] hover:bg-white hover:text-[#2f2420]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 rounded-xl border border-[#eadfd7] bg-white p-4">
        <p className="text-sm font-semibold text-[#2f2420]">MVP First</p>
        <p className="mt-1 text-xs leading-5 text-[#7a665e]">
          Candidate proof flow first. Enterprise features after stability.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;