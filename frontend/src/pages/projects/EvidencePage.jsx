import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function EvidencePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Evidence"
        title="Evidence Links"
        description="Phase 06 will add GitHub, deployment, document, screenshot, and demo video evidence management."
      />

      <Card>
        <p className="text-sm text-[#7a665e]">
          Evidence form and evidence list will be added here.
        </p>
      </Card>
    </div>
  );
}

export default EvidencePage;