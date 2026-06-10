import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/ui/Button.jsx";
import Panel from "../../components/ui/Panel.jsx";
import Tag from "../../components/ui/Tag.jsx";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, startOAuth } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <section className="pf-shell-bg flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
      <Panel className="w-full max-w-md p-6">
        <Tag>Candidate workspace</Tag>

        <h1 className="mt-4 text-2xl font-semibold text-[var(--pf-black)]">
          Create your ProofForge account
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">
          Use email/password or create an account with Google/GitHub.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button type="button" onClick={() => startOAuth("google")}>
            Continue with Google
          </Button>

          <Button type="button" onClick={() => startOAuth("github")}>
            Continue with GitHub
          </Button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--pf-line)]" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--pf-500)]">
            Or
          </span>
          <div className="h-px flex-1 bg-[var(--pf-line)]" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="pf-label">Full name</label>
            <input
              className="pf-input"
              name="fullName"
              value={form.fullName}
              onChange={updateField}
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="pf-label">Email address</label>
            <input
              className="pf-input"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="candidate@example.com"
            />
          </div>

          <div>
            <label className="pf-label">Password</label>
            <input
              className="pf-input"
              name="password"
              value={form.password}
              onChange={updateField}
              placeholder="Minimum 8 characters"
              type="password"
            />
          </div>

          {error && (
            <p className="rounded-md border border-[var(--pf-line)] bg-[var(--pf-100)] p-3 text-sm font-bold text-[var(--pf-black)]">
              {error}
            </p>
          )}

          <Button variant="black" className="w-full" type="submit">
            Create workspace
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--pf-600)]">
          Already have an account?{" "}
          <Link className="font-bold text-[var(--pf-black)] underline" to="/login">
            Sign in
          </Link>
        </p>
      </Panel>
    </section>
  );
}

export default RegisterPage;