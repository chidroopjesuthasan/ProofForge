import { Link } from "react-router-dom";
import {
  dossierSections,
  heroStats,
  platformCards,
  roadmap,
  userCards,
} from "../../data/proofForgeContent.js";
import Button from "../../components/ui/Button.jsx";
import LedgerTable from "../../components/ui/LedgerTable.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Section from "../../components/ui/Section.jsx";
import Tag from "../../components/ui/Tag.jsx";

function LandingPage() {
  return (
    <>
      <section className="pf-shell-bg border-b border-[var(--pf-line)]">
        <div className="pf-container grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Tag mode="dark">Monochrome Verification OS</Tag>

            <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-tight text-[var(--pf-black)] md:text-6xl">
              Convert project claims into evidence-backed dossiers.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--pf-600)]">
              ProofForge is a verification workspace for candidates who need to prove
              real project work. It organizes repositories, deployments, project archives,
              documents, screenshots, and proofmarked files into structured dossiers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button variant="black" size="lg">Start verification</Button>
              </Link>
              <Link to="/login">
                <Button size="lg">Open workspace</Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {heroStats.map(([label, value]) => (
                <MetricCard key={label} label={label} value={value} />
              ))}
            </div>
          </div>

          <Panel className="overflow-hidden">
            <div className="border-b border-[var(--pf-line-dark)] bg-[var(--pf-black)] p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--pf-300)]">
                    ProofForge Dossier
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    AI Full Stack Project
                  </h2>
                  <p className="mt-1 text-sm text-[var(--pf-300)]">
                    Candidate verification ledger
                  </p>
                </div>
                <Tag mode="inverse">Strong proof</Tag>
              </div>
            </div>

            <div className="p-5">
              <LedgerTable
                rows={[
                  ["Architecture", "Frontend, backend, database, authentication, and AI integration found.", "Recorded"],
                  ["Evidence", "Claims mapped to repository links, uploads, documents, and proofmarked files.", "Linked"],
                  ["Skills", "React, Spring Boot, JWT, database design, and AI integration detected.", "Mapped"],
                  ["Risks", "Missing tests and weak deployment explanation require follow-up.", "Review"],
                ]}
              />
            </div>
          </Panel>
        </div>
      </section>

      <Section
        id="platform"
        eyebrow="Platform"
        title="A workspace designed around proof, not decoration."
        description="ProofForge should feel like an evidence system. Every object in the UI must answer one question: what proves this project is real?"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platformCards.map((card) => (
            <Panel key={card.title} className="pf-panel-hover p-5">
              <h3 className="font-bold text-[var(--pf-black)]">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">{card.body}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section
        id="users"
        eyebrow="Users"
        title="Built candidate-first, useful to reviewers."
        description="The first stable product must help candidates generate proof. Reviewers, recruiters, mentors, and colleges benefit from that structured output."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {userCards.map(([title, desc]) => (
            <Panel key={title} className="p-5">
              <h3 className="font-bold text-[var(--pf-black)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">{desc}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section
        id="standards"
        eyebrow="Proof standards"
        title=".pf.ignore and .proofmark make ProofForge unique."
        description="These two files turn a normal project folder into a verification-aware project."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel className="p-5">
            <Tag>.pf.ignore</Tag>
            <h3 className="mt-4 font-bold text-[var(--pf-black)]">Do not scan noise.</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">
              Prevent dependencies, generated output, local config, cache, secrets, and heavy files from polluting analysis.
            </p>
            <pre className="pf-code mt-4 overflow-x-auto rounded-lg border border-[var(--pf-line)] bg-[var(--pf-100)] p-4 text-sm">
{`node_modules/
dist/
build/
target/
.env
.venv/
__pycache__/`}
            </pre>
          </Panel>

          <Panel className="p-5">
            <Tag>.proofmark</Tag>
            <h3 className="mt-4 font-bold text-[var(--pf-black)]">Look here carefully.</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">
              Mark files that prove important features such as authentication, AI integration, deployment, database design, or dossier generation.
            </p>
            <pre className="pf-code mt-4 overflow-x-auto rounded-lg border border-[var(--pf-line)] bg-[var(--pf-100)] p-4 text-sm">
{`auth/JwtService.java => security proof
ai/GeminiAnalyzer.java => AI proof
dossier/DossierService.java => report proof`}
            </pre>
          </Panel>
        </div>
      </Section>

      <Section
        id="dossier"
        eyebrow="Dossier"
        title="The report is the product."
        description="ProofForge Dossiers should be structured enough for a recruiter, mentor, or college reviewer to evaluate project evidence without guessing."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {dossierSections.map((section) => (
            <div key={section} className="rounded-lg border border-[var(--pf-line)] bg-white p-4 text-sm font-bold text-[var(--pf-black)]">
              {section}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="roadmap"
        eyebrow="Roadmap"
        title="MVP-first engineering sequence."
        description="No organization dashboard, billing, teams, or enterprise features before the candidate proof workflow works."
      >
        <LedgerTable rows={roadmap.map(([phase, title, desc]) => [`${phase}: ${title}`, desc, "Queued"])} />
      </Section>

      <Section
        id="enterprise"
        dark
        eyebrow="Enterprise later"
        title="ProofForge can become a company verification layer."
        description="But only after the core project-to-dossier workflow is real, tested, and useful."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Reviewer comments",
            "Shareable dossier links",
            "College project review",
            "Hiring team workspace",
            "Candidate comparison",
            "Interview question generator",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-[var(--pf-700)] bg-[var(--pf-900)] p-4 text-sm font-bold text-[var(--pf-100)]">
              {item}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default LandingPage;