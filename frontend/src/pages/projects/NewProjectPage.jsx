import Button from "../../components/ui/Button.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";

function NewProjectPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        eyebrow="Project Intake"
        title="Create Project"
        description="This form will connect to the backend project API in Phase 05."
      />

      <Panel className="p-6">
        <form className="grid gap-5">
          <div>
            <label className="pf-label">Project title</label>
            <input className="pf-input" placeholder="Example: AI Code Review Platform" />
          </div>

          <div>
            <label className="pf-label">Project description</label>
            <textarea className="pf-input min-h-32" placeholder="Explain the problem, users, features, and your contribution." />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="pf-label">Category</label>
              <input className="pf-input" placeholder="AI SaaS, Full Stack, Mobile, Data, etc." />
            </div>

            <div>
              <label className="pf-label">Tech stack</label>
              <input className="pf-input" placeholder="React, Spring Boot, H2, Gemini API" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="black" type="button">Save Project Later</Button>
            <Button type="button">Cancel</Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}

export default NewProjectPage;