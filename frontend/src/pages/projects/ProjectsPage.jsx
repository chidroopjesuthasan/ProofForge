import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function ProjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="Manage candidate projects and prepare evidence for ProofForge analysis."
        action={
          <Link to="/projects/new">
            <Button>New Project</Button>
          </Link>
        }
      />

      <EmptyState
        title="No projects yet"
        description="Create your first project. Later, you will attach GitHub links, deployment links, upload ZIP files, and generate ProofForge Dossiers."
        actionLabel="Create Project"
      />
    </div>
  );
}

export default ProjectsPage;