import { useEffect, useMemo, useState } from "react";
import { evidenceApi } from "../../features/evidence/evidenceApi";

const EVIDENCE_TYPES = [
  "GITHUB_REPOSITORY",
  "DEPLOYMENT_URL",
  "DOCUMENTATION",
  "SCREENSHOT",
  "VIDEO_DEMO",
  "DESIGN_FILE",
  "OTHER",
];

const EMPTY_FORM = {
  type: "GITHUB_REPOSITORY",
  title: "",
  url: "",
  notes: "",
};

function formatEvidenceType(type) {
  return type
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

export default function EvidenceSection({ projectId }) {
  const [evidence, setEvidence] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  async function loadEvidence() {
    if (!projectId) return;

    setIsLoading(true);
    setError("");

    try {
      const data = await evidenceApi.getEvidence(projectId);
      setEvidence(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load evidence");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadEvidence();
  }, [projectId]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.url.trim()) {
      setError("Evidence title and URL are required.");
      return;
    }

    setIsSaving(true);
    setError("");

    const payload = {
      type: form.type,
      title: form.title.trim(),
      url: form.url.trim(),
      notes: form.notes.trim(),
    };

    try {
      if (isEditing) {
        await evidenceApi.updateEvidence(projectId, editingId, payload);
      } else {
        await evidenceApi.createEvidence(projectId, payload);
      }

      resetForm();
      await loadEvidence();
    } catch (err) {
      setError(err.message || "Unable to save evidence");
    } finally {
      setIsSaving(false);
    }
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      type: item.type || "OTHER",
      title: item.title || "",
      url: item.url || "",
      notes: item.notes || "",
    });
  }

  async function handleDelete(evidenceId) {
    const confirmed = window.confirm("Delete this evidence link?");

    if (!confirmed) return;

    setError("");

    try {
      await evidenceApi.deleteEvidence(projectId, evidenceId);
      await loadEvidence();
    } catch (err) {
      setError(err.message || "Unable to delete evidence");
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-5">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
          Evidence Registry
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-100">
          Project proof links
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Attach GitHub repositories, deployments, documentation, screenshots,
          demos, and design references that prove this project was actually built.
        </p>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[380px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-800 bg-black p-4"
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-zinc-100">
              {isEditing ? "Update evidence" : "Add evidence"}
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              Keep links specific and verifiable.
            </p>
          </div>

          <label className="mb-3 block">
            <span className="mb-1 block text-xs font-medium text-zinc-400">
              Evidence type
            </span>
            <select
              value={form.type}
              onChange={(event) => updateField("type", event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-400"
            >
              {EVIDENCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {formatEvidenceType(type)}
                </option>
              ))}
            </select>
          </label>

          <label className="mb-3 block">
            <span className="mb-1 block text-xs font-medium text-zinc-400">
              Title
            </span>
            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Main GitHub repository"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-400"
            />
          </label>

          <label className="mb-3 block">
            <span className="mb-1 block text-xs font-medium text-zinc-400">
              URL
            </span>
            <input
              value={form.url}
              onChange={(event) => updateField("url", event.target.value)}
              placeholder="https://github.com/username/project"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-400"
            />
          </label>

          <label className="mb-4 block">
            <span className="mb-1 block text-xs font-medium text-zinc-400">
              Notes
            </span>
            <textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Explain why this link proves the project feature."
              rows="4"
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-400"
            />
          </label>

          {error ? (
            <div className="mb-4 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-200">
              {error}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Update evidence"
                  : "Add evidence"}
            </button>

            {isEditing ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="rounded-xl border border-zinc-800 bg-black">
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Attached evidence
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                {evidence.length} item{evidence.length === 1 ? "" : "s"} linked
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="p-5 text-sm text-zinc-500">
              Loading evidence...
            </div>
          ) : evidence.length === 0 ? (
            <div className="p-5">
              <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center">
                <p className="text-sm font-medium text-zinc-200">
                  No evidence linked yet.
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Add GitHub, deployment, documentation, or demo links to start
                  building the ProofForge Dossier.
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {evidence.map((item) => (
                <article key={item.id} className="p-4">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400">
                          {formatEvidenceType(item.type)}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-zinc-100">
                        {item.title}
                      </h4>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block break-all text-sm text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-white"
                      >
                        {item.url}
                      </a>

                      {item.notes ? (
                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                          {item.notes}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}