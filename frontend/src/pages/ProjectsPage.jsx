import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectApi } from "../api/projectApi";

function StatusBadge({ status }) {
  return (
    <span className="inline-flex rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-gray-700">
      {status || "DRAFT"}
    </span>
  );
}

function formatDate(value) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");
      const data = await projectApi.listProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleDelete(projectId) {
    const confirmed = window.confirm("Delete this project?");

    if (!confirmed) {
      return;
    }

    try {
      await projectApi.deleteProject(projectId);
      setProjects((current) => current.filter((project) => project.id !== projectId));
    } catch (err) {
      setError(err.message || "Unable to delete project.");
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-black">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              ProofForge Workspace
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-black">
              Candidate Projects
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Create and manage project records before attaching repositories,
              proof files, deployment links, and AI analysis evidence.
            </p>
          </div>

          <Link
            to="/projects/new"
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            New Project
          </Link>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-black">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-600">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-black">No projects yet</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-600">
              Start by creating your first candidate project. Later phases will
              attach ZIP uploads, proof markers, evidence links, and AI dossier output.
            </p>
            <Link
              to="/projects/new"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Create First Project
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-400"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <StatusBadge status={project.status} />
                      <span className="text-xs uppercase tracking-[0.18em] text-gray-500">
                        Updated {formatDate(project.updatedAt)}
                      </span>
                    </div>

                    <Link
                      to={`/projects/${project.id}`}
                      className="block text-xl font-semibold tracking-tight text-black hover:underline"
                    >
                      {project.title}
                    </Link>

                    <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-gray-600">
                      {project.description || "No description added yet."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>GitHub: {project.githubUrl ? "Attached" : "Not attached"}</span>
                      <span>Deployment: {project.deploymentUrl ? "Attached" : "Not attached"}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-100"
                    >
                      Open
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}