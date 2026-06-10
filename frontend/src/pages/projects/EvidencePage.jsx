import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";

function EvidencePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Evidence Intake"
        title="Evidence Links"
        description="Phase 06 will add GitHub, deployment, documentation, screenshot, demo video, and external proof management."
      />

      <Panel className="p-5">
        <Tag>Coming in Phase 06</Tag>
        <p className="mt-4 text-sm leading-6 text-[var(--pf-600)]">
          Evidence is the first trust layer. ProofForge will collect and later verify
          links that support the candidate project claims.
        </p>
      </Panel>
    </div>
  );
}

export default EvidencePage;