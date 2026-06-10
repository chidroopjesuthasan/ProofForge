import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EvidenceSection from "../../components/evidence/EvidenceSection";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("pf_token")
  );
}

async function getProject(projectId) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        data?.detail ||
        `Unable to load project. Status ${response.status}`
    );
  }

  return data;
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.projectId || params.id;

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      if (!projectId) {
        setError("Project ID was not found in the route.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const data = await getProject(projectId);
        setProject(data);
      } catch (err) {
        setError(err.message || "Unable to load project");
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-6 py-8 text-zinc-100">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-400">
            Loading project workspace...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black px-6 py-8 text-zinc-100">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/projects"
            className="text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-white"
          >
            Back to projects
          </Link>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm font-medium text-zinc-100">
              Unable to open project
            </p>
            <p className="mt-2 text-sm text-zinc-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-8 text-zinc-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              to="/projects"
              className="text-sm text-zinc-500 underline decoration-zinc-700 underline-offset-4 hover:text-white"
            >
              Back to projects
            </Link>

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.32em] text-zinc-500">
              Project Workspace
            </p>

            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-50">
              {project?.title || "Untitled Project"}
            </h1>

            {project?.description ? (
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                {project.description}
              </p>
            ) : null}
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              Project ID
            </p>
            <p className="mt-1 font-mono text-sm text-zinc-200">{projectId}</p>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
              Repository
            </p>

            {project?.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block break-all text-sm text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
              >
                {project.githubUrl}
              </a>
            ) : (
              <p className="mt-3 text-sm text-zinc-500">
                No GitHub repository added.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
              Deployment
            </p>

            {project?.deploymentUrl ? (
              <a
                href={project.deploymentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block break-all text-sm text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white"
              >
                {project.deploymentUrl}
              </a>
            ) : (
              <p className="mt-3 text-sm text-zinc-500">
                No deployment URL added.
              </p>
            )}
          </div>
        </section>

        <EvidenceSection projectId={projectId} />
      </div>
    </main>
  );
}