import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import LandingPage from "../pages/public/LandingPage.jsx";
import LoginPage from "../pages/public/LoginPage.jsx";
import RegisterPage from "../pages/public/RegisterPage.jsx";

import DashboardPage from "../pages/dashboard/DashboardPage.jsx";

import ProjectsPage from "../pages/projects/ProjectsPage.jsx";
import NewProjectPage from "../pages/projects/NewProjectPage.jsx";
import ProjectDetailsPage from "../pages/projects/ProjectDetailsPage.jsx";
import EvidencePage from "../pages/projects/EvidencePage.jsx";
import UploadPage from "../pages/projects/UploadPage.jsx";
import FilesPage from "../pages/projects/FilesPage.jsx";
import AnalysisPage from "../pages/projects/AnalysisPage.jsx";
import DossierPage from "../pages/projects/DossierPage.jsx";

import ReportsPage from "../pages/reports/ReportsPage.jsx";
import ReportDetailsPage from "../pages/reports/ReportDetailsPage.jsx";

import SettingsPage from "../pages/settings/SettingsPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/projects/:projectId/evidence" element={<EvidencePage />} />
          <Route path="/projects/:projectId/upload" element={<UploadPage />} />
          <Route path="/projects/:projectId/files" element={<FilesPage />} />
          <Route path="/projects/:projectId/analysis" element={<AnalysisPage />} />
          <Route path="/projects/:projectId/dossier" element={<DossierPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:dossierId" element={<ReportDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;