import { Link, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";

const tabs = [
  { label: "Evidence", path: "evidence", desc: "External proof links and references" },
  { label: "Upload", path: "upload", desc: "Project ZIP source archive" },
  { label: "Files", path: "files", desc: "Scanned tree and proofmarks" },
  { label: "Analysis", path: "analysis", desc: "AI findings and risk notes" },
  { label: "Dossier", path: "dossier", desc: "Final verification report" },
];

function ProjectDetailsPage() {
  const { projectId } = useParams();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Project Workspace"
        title={`Project #${projectId}`}
        description="Manage the full verification pipeline: evidence, uploads, file scanning, AI analysis, and dossier generation."
        action={<Tag>Draft</Tag>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {tabs.map((tab) => (
          <Link key={tab.path} to={`/projects/${projectId}/${tab.path}`}>
            <Panel className="pf-panel-hover h-full p-5">
              <p className="font-bold text-[var(--pf-black)]">{tab.label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">{tab.desc}</p>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;