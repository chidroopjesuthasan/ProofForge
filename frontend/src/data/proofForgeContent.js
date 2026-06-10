export const publicNavGroups = [
  {
    title: "Platform",
    links: [
      ["Evidence Ledger", "Capture GitHub, deployments, files, screenshots, and documents.", "#platform"],
      ["Source Scanner", "Inspect project archives while avoiding generated or sensitive files.", "#platform"],
      ["Dossier Engine", "Generate structured proof reports for review and hiring.", "#dossier"],
    ],
  },
  {
    title: "Verification",
    links: [
      [".pf.ignore", "Exclude dependencies, generated output, local files, and secrets.", "#standards"],
      [".proofmark", "Highlight files that prove important project features.", "#standards"],
      ["Risk Review", "Surface missing evidence, weak docs, and unclear ownership.", "#dossier"],
    ],
  },
  {
    title: "Users",
    links: [
      ["Candidates", "Convert project work into proof.", "#users"],
      ["Mentors", "Review structured evidence faster.", "#users"],
      ["Recruiters", "Inspect proof before interviews.", "#users"],
      ["Colleges", "Evaluate projects with clearer evidence.", "#users"],
    ],
  },
];

export const heroStats = [
  ["Proof Score", "88"],
  ["Evidence Items", "09"],
  ["Mapped Skills", "16"],
  ["Risk Notes", "02"],
];

export const platformCards = [
  {
    title: "Evidence Ledger",
    body:
      "A project is not treated as a simple portfolio card. ProofForge stores evidence as structured records: repository links, deployment links, documents, screenshots, demo videos, uploaded source archives, and candidate explanations.",
  },
  {
    title: "Verification Workspace",
    body:
      "The candidate workspace is designed around proof readiness. It shows missing evidence, upload status, analysis readiness, proofmarked files, and final dossier state.",
  },
  {
    title: "Source Intelligence",
    body:
      "Uploaded ZIP files are scanned into file trees. ProofForge ignores unnecessary files and identifies meaningful source, config, documentation, security, database, and AI integration files.",
  },
  {
    title: "Dossier Output",
    body:
      "The final ProofForge Dossier explains what the project does, what the candidate likely built, which skills are demonstrated, what evidence supports the claims, and what requires further verification.",
  },
];

export const userCards = [
  ["Candidates", "Attach ProofForge Dossiers to resumes, portfolios, LinkedIn posts, and job applications."],
  ["Students", "Convert mini projects, hackathon work, and final-year projects into structured academic proof."],
  ["Mentors", "Review important project evidence without manually reading every repository folder."],
  ["Recruiters", "Understand project depth, technical relevance, and risk before interview rounds."],
];

export const dossierSections = [
  "Executive summary",
  "Proof strength",
  "Evidence traceability",
  "Architecture summary",
  "Skill map",
  "Source scan",
  "Proofmarked files",
  "Risk notes",
  "Reviewer questions",
  "Improvement tasks",
];

export const roadmap = [
  ["Phase 04", "Authentication", "Register, login, JWT, protected routes, current user."],
  ["Phase 05", "Projects", "Create, list, update, delete, and open project workspaces."],
  ["Phase 06", "Evidence", "Add GitHub, deployment, documentation, screenshot, video, and proof links."],
  ["Phase 07", "Upload + Scan", "Upload ZIP, scan files, apply .pf.ignore, create file tree."],
  ["Phase 08", ".proofmark", "Detect proofmarked files and display them as important evidence."],
  ["Phase 09", "AI Analysis", "Gemini analysis for summary, architecture, skills, and risk findings."],
  ["Phase 11", "Dossier", "Generate the final verification report."],
];

export const workspaceGroups = [
  {
    title: "Workspace",
    items: [
      ["Command Center", "/dashboard"],
      ["Projects", "/projects"],
      ["Generated Dossiers", "/reports"],
    ],
  },
  {
    title: "Verification Pipeline",
    items: [
      ["Evidence Intake", "/projects/1/evidence"],
      ["Source Upload", "/projects/1/upload"],
      ["File Intelligence", "/projects/1/files"],
      ["AI Analysis", "/projects/1/analysis"],
      ["Dossier Preview", "/projects/1/dossier"],
    ],
  },
  {
    title: "System",
    items: [["Settings", "/settings"]],
  },
];

export const dashboardStats = [
  ["Projects", "0", "No project records yet."],
  ["Evidence", "0", "No proof links attached."],
  ["Uploads", "0", "No source archives scanned."],
  ["Dossiers", "0", "No verification reports generated."],
  ["Risk Notes", "--", "Available after analysis."],
];

export const pipelineRows = [
  ["Project intake", "Create structured project metadata, stack, category, ownership notes, and candidate explanation.", "Waiting"],
  ["Evidence collection", "Attach repositories, live deployments, screenshots, documents, videos, and supporting references.", "Waiting"],
  ["Source archive scan", "Upload ZIP files and transform raw files into a clean evidence-aware file tree.", "Waiting"],
  [".pf.ignore filtering", "Exclude dependencies, generated outputs, build folders, secrets, cache, and irrelevant assets.", "Waiting"],
  [".proofmark detection", "Identify source files that the candidate marks as proof of important features.", "Waiting"],
  ["AI analysis", "Summarize architecture, map skills, inspect evidence gaps, and generate risk notes.", "Waiting"],
  ["Dossier generation", "Produce a structured verification report for recruiters, colleges, mentors, and reviewers.", "Waiting"],
];