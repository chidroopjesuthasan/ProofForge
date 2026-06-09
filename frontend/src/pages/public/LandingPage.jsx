import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";

function LandingPage() {
  return (
    <section className="pf-container pb-20 pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Badge tone="maroon">AI-powered project proof dossiers</Badge>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-[#2f2420] md:text-6xl">
            Prove your project, not just your portfolio.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6b4e45]">
            ProofForge converts GitHub repositories, deployment links, documents,
            screenshots, and project ZIP files into structured dossiers with proof
            strength, skill mapping, architecture summaries, and recruiter-ready evidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register">
              <Button size="lg">Start ProofForge</Button>
            </Link>

            <Link to="/login">
              <Button size="lg" variant="secondary">Open workspace</Button>
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-[#eadfd7] bg-white/70 p-3">
              <p className="font-semibold text-[#2f2420]">01</p>
              <p className="mt-1 text-[#7a665e]">Attach evidence</p>
            </div>
            <div className="rounded-lg border border-[#eadfd7] bg-white/70 p-3">
              <p className="font-semibold text-[#2f2420]">02</p>
              <p className="mt-1 text-[#7a665e]">Run AI analysis</p>
            </div>
            <div className="rounded-lg border border-[#eadfd7] bg-white/70 p-3">
              <p className="font-semibold text-[#2f2420]">03</p>
              <p className="mt-1 text-[#7a665e]">Generate dossier</p>
            </div>
          </div>
        </div>

        <Card className="pf-card-hover">
          <div className="border-b border-[#eadfd7] pb-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#8b756c]">ProofForge Dossier</p>
                <h2 className="mt-1 text-2xl font-semibold text-[#2f2420]">
                  AI Code Review Platform
                </h2>
              </div>
              <Badge tone="green">Strong Proof</Badge>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              ["Repository Evidence", "Source code structure and project files detected."],
              ["Proof Strength", "Evidence, architecture, and skill signals scored."],
              ["AI Summary", "Recruiter-friendly explanation generated."],
              [".proofmark Highlights", "Important feature files highlighted as proof."]
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-[#eadfd7] bg-[#fffaf5] p-4">
                <h3 className="font-semibold text-[#2f2420]">{title}</h3>
                <p className="mt-1 text-sm text-[#7a665e]">{text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

export default LandingPage;