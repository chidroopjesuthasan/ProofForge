import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";
import api from "../../lib/api.js";

const initialForm = {
  title: "",
  description: "",
  githubUrl: "",
  deploymentUrl: "",
};

function NewProjectPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.post("/api/projects", {
        title: form.title.trim(),
        description: form.description.trim(),
        githubUrl: form.githubUrl.trim(),
        deploymentUrl: form.deploymentUrl.trim(),
      });

      navigate(`/projects/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to create project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        eyebrow="Project Intake"
        title="Create Project"
        description="Create a candidate project record before attaching proof evidence."
      />

      <Panel className="p-6">
        <form onSubmit={submit} className="grid gap-5">
          <div>
            <label className="pf-label">Project title</label>
            <input
              className="pf-input"
              name="title"
              value={form.title}
              onChange={updateField}
              placeholder="Example: AI Code Review Platform"
            />
          </div>

          <div>
            <label className="pf-label">Project description</label>
            <textarea
              className="pf-input min-h-32"
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Explain the problem, users, features, and your contribution."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="pf-label">GitHub repository URL</label>
              <input
                className="pf-input"
                name="githubUrl"
                value={form.githubUrl}
                onChange={updateField}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div>
              <label className="pf-label">Deployment URL</label>
              <input
                className="pf-input"
                name="deploymentUrl"
                value={form.deploymentUrl}
                onChange={updateField}
                placeholder="https://your-project.vercel.app"
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-[var(--pf-line)] bg-[var(--pf-100)] px-4 py-3 text-sm font-bold text-[var(--pf-black)]">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button variant="black" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Project"}
            </Button>

            <Link to="/projects">
              <Button type="button">Cancel</Button>
            </Link>
          </div>
        </form>
      </Panel>
    </div>
  );
}

export default NewProjectPage;