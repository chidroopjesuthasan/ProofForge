import Button from "../../components/ui/Button.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";

function UploadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Source Intake"
        title="Project ZIP Upload"
        description="Phase 07 will add ZIP upload, extraction, file scanning, .pf.ignore support, and scan metadata."
      />

      <Panel className="p-5">
        <div className="rounded-lg border border-dashed border-[var(--pf-line-strong)] bg-[var(--pf-100)] p-10 text-center">
          <p className="text-lg font-bold text-[var(--pf-black)]">
            Upload project archive
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--pf-600)]">
            Later this area will accept a project ZIP, scan source files, skip unwanted files,
            and prepare proofmarked files for AI analysis.
          </p>
          <Button className="mt-6" type="button">Upload disabled until Phase 07</Button>
        </div>
      </Panel>
    </div>
  );
}

export default UploadPage;