import Badge from "../../components/ui/Badge.jsx";
import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import StatCard from "../../components/ui/StatCard.jsx";

function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Track projects, evidence, AI analyses, and generated ProofForge Dossiers."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value="0" helper="Create your first project" />
        <StatCard label="Dossiers" value="0" helper="No reports yet" />
        <StatCard label="Average Proof Score" value="--" helper="Available after AI analysis" />
        <StatCard label="AI Runs" value="0" helper="Gemini integration later" />
      </section>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#2f2420]">Build Status</h2>
            <p className="mt-1 text-sm text-[#7a665e]">
              Phase 03 frontend foundation has been refurnished with the ProofForge maroon theme.
            </p>
          </div>
          <Badge tone="maroon">Phase 03 Restart</Badge>
        </div>
      </Card>
    </div>
  );
}

export default DashboardPage;