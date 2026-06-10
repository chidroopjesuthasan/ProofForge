import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import api from "../../lib/api.js";

function formatDate(value) {
  if (!value) {
    return "Not updated";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/projects");
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(projectId) {
    const confirmed = window.confirm("Delete this project?");

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/api/projects/${projectId}`);
      setProjects((current) => current.filter((project) => project.id !== projectId));
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to delete project.");
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Projects"
        title="Candidate Projects"
        description="Create projects, attach proof evidence, upload source files, and generate verification dossiers."
        action={
          <Link to="/projects/new">
            <Button variant="black">New Project</Button>
          </Link>
        }
      />

      {error ? (
        <div className="rounded-xl border border-[var(--pf-line)] bg-[var(--pf-100)] px-4 py-3 text-sm font-bold text-[var(--pf-black)]">
          {error}
        </div>
      ) : null}

      {loading ? (
        <Panel className="p-6">
          <p className="text-sm text-[var(--pf-600)]">Loading projects...</p>
        </Panel>
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Create your first project. Then attach GitHub links, deployment links, upload ZIP files, run AI analysis, and generate a ProofForge Dossier."
          action={
            <Link to="/projects/new">
              <Button variant="black">Create first project</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Panel key={project.id} className="p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[var(--pf-line)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--pf-600)]">
                      {project.status || "DRAFT"}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-[var(--pf-500)]">
                      Updated {formatDate(project.updatedAt)}
                    </span>
                  </div>

                  <Link
                    to={`/projects/${project.id}`}
                    className="block text-xl font-semibold tracking-tight text-[var(--pf-black)] hover:underline"
                  >
                    {project.title}
                  </Link>

                  <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-[var(--pf-600)]">
                    {project.description || "No description added yet."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--pf-500)]">
                    <span>GitHub: {project.githubUrl ? "Attached" : "Not attached"}</span>
                    <span>Deployment: {project.deploymentUrl ? "Attached" : "Not attached"}</span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link to={`/projects/${project.id}`}>
                    <Button type="button">Open</Button>
                  </Link>

                  <Button type="button" onClick={() => deleteProject(project.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;