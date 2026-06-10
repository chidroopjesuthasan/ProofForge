import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";

function LoginPage() {
  return (
    <section className="pf-shell-bg flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
      <Panel className="w-full max-w-md p-6">
        <Tag mode="dark">Workspace access</Tag>

        <h1 className="mt-4 text-2xl font-semibold text-[var(--pf-black)]">
          Sign in to ProofForge
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">
          Access your verification workspace, manage evidence, run analysis,
          and generate structured ProofForge Dossiers.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="pf-label">Email address</label>
            <input className="pf-input" placeholder="candidate@example.com" />
          </div>

          <div>
            <label className="pf-label">Password</label>
            <input className="pf-input" placeholder="Password" type="password" />
          </div>

          <Link to="/dashboard">
            <Button variant="black" className="w-full" type="button">
              Continue to workspace
            </Button>
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--pf-600)]">
          New to ProofForge?{" "}
          <Link className="font-bold text-[var(--pf-black)] underline" to="/register">
            Create account
          </Link>
        </p>
      </Panel>
    </section>
  );
}

export default LoginPage;