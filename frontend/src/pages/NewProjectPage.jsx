import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projectApi } from "../api/projectApi";

const initialForm = {
  title: "",
  description: "",
  githubUrl: "",
  deploymentUrl: "",
  status: "DRAFT",
};

export default function NewProjectPage() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const created = await projectApi.createProject({
        title: form.title,
        description: form.description,
        githubUrl: form.githubUrl,
        deploymentUrl: form.deploymentUrl,
        status: form.status,
      });

      navigate(`/projects/${created.id}`);
    } catch (err) {
      setError(err.message || "Unable to create project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-black">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <Link to="/projects" className="text-sm font-medium text-gray-600 hover:text-black">
            ← Back to projects
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            New Candidate Project
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black">
            Create Project
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            Add the base project record. Evidence links, ZIP upload, AI analysis,
            and dossier generation will come in later MVP phases.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-black">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black">Project title</span>
              <input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
                maxLength={140}
                placeholder="Example: AI Resume Screener"
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-black">Description</span>
              <textarea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                maxLength={2000}
                rows={6}
                placeholder="Explain what the project does, who it is for, and what you built."
                className="resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-black outline-none transition placeholder:text-gray-400 focus:border-black"
              />
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-black">GitHub URL</span>
                <input
                  value={form.githubUrl}
                  onChange={(event) => updateField("githubUrl", event.target.value)}
                  placeholder="https://github.com/username/project"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-black">Deployment URL</span>
                <input
                  value={form.deploymentUrl}
                  onChange={(event) => updateField("deploymentUrl", event.target.value)}
                  placeholder="https://project.vercel.app"
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-black">Status</span>
              <select
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="READY_FOR_ANALYSIS">READY_FOR_ANALYSIS</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </label>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-black transition hover:bg-gray-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {saving ? "Creating..." : "Create Project"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}