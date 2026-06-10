import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";

function AnalysisPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Analysis"
        title="Project Intelligence"
        description="Phase 09 will connect Gemini AI to generate summaries, architecture findings, skill mappings, and verification risks."
      />

      <Panel className="p-5">
        <Tag>Gemini API later</Tag>
        <p className="mt-4 text-sm leading-6 text-[var(--pf-600)]">
          ProofForge will combine deterministic project signals with AI reasoning.
          AI should explain evidence, not blindly judge the candidate.
        </p>
      </Panel>
    </div>
  );
}

export default AnalysisPage;