import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar.jsx";
import Topbar from "../components/navigation/Topbar.jsx";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#2f2420]">
      <div className="flex">
        <Sidebar />

        <div className="min-h-screen flex-1">
          <Topbar />

          <main className="px-4 py-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;