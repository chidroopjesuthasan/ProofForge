import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function FilesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="File Scan"
        title="Scanned Files"
        description="This page will show file trees, ignored files, and proofmarked files after upload scanning."
      />

      <Card>
        <p className="text-sm text-[#7a665e]">
          File tree preview will appear here after Phase 07.
        </p>
      </Card>
    </div>
  );
}

export default FilesPage;