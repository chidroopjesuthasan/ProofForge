import { Link, useParams } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Card from "../../components/ui/Card.jsx";

const tabs = [
  { label: "Evidence", path: "evidence" },
  { label: "Upload", path: "upload" },
  { label: "Files", path: "files" },
  { label: "Analysis", path: "analysis" },
  { label: "Dossier", path: "dossier" },
];

function ProjectDetailsPage() {
  const { projectId } = useParams();

  return (
    <div className="space-y-6">
      <Card>
        <Badge tone="maroon">Project Workspace</Badge>

        <h1 className="mt-4 text-3xl font-semibold text-[#2f2420]">
          Project #{projectId}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7a665e]">
          This workspace will hold evidence, uploads, file scanning, AI analysis,
          and ProofForge Dossier generation.
        </p>
      </Card>

      <div className="grid gap-3 md:grid-cols-5">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={`/projects/${projectId}/${tab.path}`}
            className="rounded-xl border border-[#eadfd7] bg-white p-4 text-sm font-medium text-[#6b4e45] transition hover:border-[#7f1d1d] hover:bg-[#fff0ed] hover:text-[#7f1d1d]"
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;