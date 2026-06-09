import Badge from "../../components/ui/Badge.jsx";
import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function DossierPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dossier"
        title="ProofForge Dossier"
        description="Phase 11 will generate the full dossier with proof strength, skill mapping, architecture summary, and evidence scoring."
      />

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#2f2420]">
              Dossier Preview
            </h2>
            <p className="mt-1 text-sm text-[#7a665e]">
              Proof score, skills, evidence, and risk flags will appear here.
            </p>
          </div>
          <Badge tone="cream">Pending Analysis</Badge>
        </div>
      </Card>
    </div>
  );
}

export default DossierPage;