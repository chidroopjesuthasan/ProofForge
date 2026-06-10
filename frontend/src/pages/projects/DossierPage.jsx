import MetricCard from "../../components/ui/MetricCard.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";

function DossierPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dossier"
        title="ProofForge Dossier"
        description="Phase 11 will generate the final recruiter-ready verification report."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Proof Strength" value="--" helper="Pending analysis" />
        <MetricCard label="Detected Skills" value="--" helper="Pending analysis" />
        <MetricCard label="Risk Level" value="--" helper="Pending analysis" />
      </div>

      <Panel className="p-5">
        <Tag>Pending Analysis</Tag>
        <p className="mt-4 text-sm leading-6 text-[var(--pf-600)]">
          The final dossier will contain proof strength, score breakdown,
          architecture summary, skill mapping, evidence traceability, proofmarked files,
          AI findings, and reviewer notes.
        </p>
      </Panel>
    </div>
  );
}

export default DossierPage;