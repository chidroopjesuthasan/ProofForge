import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Panel from "../../components/ui/Panel.jsx";

function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { acceptOAuthToken } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("OAuth login did not return a token.");
      return;
    }

    acceptOAuthToken(token)
      .then(() => navigate("/dashboard", { replace: true }))
      .catch(() => setError("OAuth login failed. Please try again."));
  }, []);

  return (
    <section className="pf-shell-bg flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
      <Panel className="w-full max-w-md p-6 text-center">
        <h1 className="text-xl font-bold text-[var(--pf-black)]">
          Completing secure login
        </h1>

        <p className="mt-2 text-sm leading-6 text-[var(--pf-600)]">
          ProofForge is verifying your OAuth session.
        </p>

        {error && (
          <p className="mt-4 rounded-md border border-[var(--pf-line)] bg-[var(--pf-100)] p-3 text-sm font-bold text-[var(--pf-black)]">
            {error}
          </p>
        )}
      </Panel>
    </section>
  );
}

export default OAuthCallbackPage;