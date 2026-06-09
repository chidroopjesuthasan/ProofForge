import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function NewProjectPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        eyebrow="Project Setup"
        title="Create Project"
        description="Project creation API will be connected in Phase 05."
      />

      <Card>
        <form className="space-y-4">
          <input className="w-full rounded-lg border border-[#eadfd7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#7f1d1d]" placeholder="Project title" />
          <textarea className="min-h-32 w-full rounded-lg border border-[#eadfd7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#7f1d1d]" placeholder="Project description" />
          <input className="w-full rounded-lg border border-[#eadfd7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#7f1d1d]" placeholder="Tech stack, example: React, Spring Boot, H2, Gemini API" />

          <Button type="button">Save Project Later</Button>
        </form>
      </Card>
    </div>
  );
}

export default NewProjectPage;