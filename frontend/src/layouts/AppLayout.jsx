import { Outlet } from "react-router-dom";
import WorkspaceSidebar from "../components/navigation/WorkspaceSidebar.jsx";
import WorkspaceTopbar from "../components/navigation/WorkspaceTopbar.jsx";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--pf-canvas)] text-[var(--pf-900)]">
      <WorkspaceTopbar />

      <div className="flex">
        <WorkspaceSidebar />

        <main className="min-h-[calc(100vh-64px)] flex-1 px-4 py-6 md:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;