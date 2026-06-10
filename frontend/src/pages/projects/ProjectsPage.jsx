import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function ProjectsPage() {
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
        tabs={[
          { label: "All", href: "#", active: true },
          { label: "Draft", href: "#" },
          { label: "Evidence Added", href: "#" },
          { label: "Analyzed", href: "#" },
          { label: "Dossier Ready", href: "#" },
        ]}
      />

      <EmptyState
        title="No projects found"
        description="Create your first project. Then attach GitHub links, deployment links, upload ZIP files, run AI analysis, and generate a ProofForge Dossier."
        action={
          <Link to="/projects/new">
            <Button variant="black">Create first project</Button>
          </Link>
        }
      />
    </div>
  );
}

export default ProjectsPage;