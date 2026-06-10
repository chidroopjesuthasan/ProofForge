import { dashboardStats, pipelineRows } from "../../data/proofForgeContent.js";
import Button from "../../components/ui/Button.jsx";
import LedgerTable from "../../components/ui/LedgerTable.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";

function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Command Center"
        title="Verification Dashboard"
        description="Monitor project readiness, evidence coverage, source scan status, AI analysis progress, and dossier generation quality."
        action={
          <div className="flex flex-wrap gap-2">
            <Button>Import Evidence</Button>
            <Button variant="black">Create Project</Button>
          </div>
        }
        tabs={[
          { label: "Overview", href: "#", active: true },
          { label: "Evidence", href: "#" },
          { label: "Uploads", href: "#" },
          { label: "Analysis", href: "#" },
          { label: "Dossiers", href: "#" },
          { label: "Risks", href: "#" },
        ]}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {dashboardStats.map(([label, value, helper]) => (
          <MetricCard key={label} label={label} value={value} helper={helper} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel className="p-0">
          <div className="border-b border-[var(--pf-line)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[var(--pf-black)]">
                  MVP Verification Pipeline
                </h2>
                <p className="mt-1 text-sm text-[var(--pf-600)]">
                  The exact product path ProofForge must complete before enterprise expansion.
                </p>
              </div>
              <Tag mode="dark">Build priority</Tag>
            </div>
          </div>

          <LedgerTable rows={pipelineRows} />
        </Panel>

        <div className="space-y-5">
          <Panel className="p-5">
            <h2 className="text-lg font-bold text-[var(--pf-black)]">
              Platform Standard
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">
              ProofForge must feel like a verification system. Screens must prioritize evidence,
              status, auditability, risk, and reviewer clarity.
            </p>

            <div className="mt-4 grid gap-2">
              {[
                "Black and white only",
                "Responsive navigation that never disappears",
                "Dense evidence-first layout",
                "Clear pending, review, and complete states",
                "Reviewer understanding in under one minute",
              ].map((item) => (
                <div key={item} className="rounded-md border border-[var(--pf-line)] bg-[var(--pf-100)] px-3 py-2 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-lg font-bold text-[var(--pf-black)]">
              Next Engineering Step
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">
              After this frontend foundation is accepted, Phase 04 connects Spring Security,
              JWT authentication, register/login APIs, AuthContext, and protected routes.
            </p>
            <div className="mt-4">
              <Tag mode="dark">Phase 04 Authentication</Tag>
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;