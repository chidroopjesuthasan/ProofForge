import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function UploadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Upload"
        title="Project ZIP Upload"
        description="Phase 07 will add ZIP upload, extraction, file scanning, and .pf.ignore support."
      />

      <Card>
        <div className="rounded-xl border border-dashed border-[#d8c7bd] bg-[#fffaf5] p-10 text-center">
          <p className="font-medium text-[#2f2420]">Upload zone placeholder</p>
          <p className="mt-2 text-sm text-[#7a665e]">
            ZIP upload will be connected later.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default UploadPage;