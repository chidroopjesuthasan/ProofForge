import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EvidenceSection from "../../components/evidence/EvidenceSection.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";
import api from "../../lib/api.js";

function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.projectId || params.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProject() {
    if (!projectId) {
      setError("Project ID was not found in the route.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to load project.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <Panel className="p-6">
        <p className="text-sm text-[var(--pf-600)]">Loading project workspace...</p>
      </Panel>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Link to="/projects" className="text-sm font-bold text-[var(--pf-black)] underline">
          Back to projects
        </Link>

        <Panel className="p-6">
          <p className="font-bold text-[var(--pf-black)]">Unable to open project</p>
          <p className="mt-2 text-sm text-[var(--pf-600)]">{error}</p>
        </Panel>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Project Workspace"
        title={project?.title || `Project #${projectId}`}
        description={project?.description || "Manage project evidence and verification assets."}
        action={<Tag>{project?.status || "DRAFT"}</Tag>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Panel className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--pf-500)]">
            Repository
          </p>

          {project?.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block break-all text-sm font-medium text-[var(--pf-black)] underline"
            >
              {project.githubUrl}
            </a>
          ) : (
            <p className="mt-3 text-sm text-[var(--pf-600)]">
              No GitHub repository added.
            </p>
          )}
        </Panel>

        <Panel className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--pf-500)]">
            Deployment
          </p>

          {project?.deploymentUrl ? (
            <a
              href={project.deploymentUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block break-all text-sm font-medium text-[var(--pf-black)] underline"
            >
              {project.deploymentUrl}
            </a>
          ) : (
            <p className="mt-3 text-sm text-[var(--pf-600)]">
              No deployment URL added.
            </p>
          )}
        </Panel>
      </div>

      <EvidenceSection projectId={projectId} />
    </div>
  );
}

export default ProjectDetailsPage;