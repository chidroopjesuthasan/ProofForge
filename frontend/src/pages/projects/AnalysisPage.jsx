import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function AnalysisPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI"
        title="AI Analysis"
        description="Phase 09 will connect Gemini AI analysis for project summary, architecture, skills, and risk findings."
      />

      <Card>
        <p className="text-sm text-[#7a665e]">
          Analysis status and findings will be displayed here.
        </p>
      </Card>
    </div>
  );
}

export default AnalysisPage;