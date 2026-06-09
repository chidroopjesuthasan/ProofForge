import { Link, Outlet } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

function PublicLayout() {
  return (
    <main className="min-h-screen pf-soft-grid">
      <header className="pf-container flex items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#7f1d1d] bg-white text-sm font-bold text-[#7f1d1d]">
            PF
          </div>
          <span className="text-lg font-semibold text-[#2f2420]">
            ProofForge
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Create account</Button>
          </Link>
        </div>
      </header>

      <Outlet />
    </main>
  );
}

export default PublicLayout;