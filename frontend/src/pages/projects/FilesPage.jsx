import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";

function FilesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="File Intelligence"
        title="Scanned Files"
        description="This page will show the project file tree, ignored files, and proofmarked files after ZIP scanning."
      />

      <Panel className="p-5">
        <pre className="pf-code overflow-x-auto rounded-lg border border-[var(--pf-line)] bg-[var(--pf-100)] p-4 text-sm">
{`project-root/
├─ frontend/
├─ backend/
├─ docs/
├─ .pf.ignore
└─ .proofmark`}
        </pre>
      </Panel>
    </div>
  );
}

export default FilesPage;