import PageHeader from "../../components/ui/PageHeader.jsx";
import Panel from "../../components/ui/Panel.jsx";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="User profile, workspace preferences, and account controls will be connected after authentication."
      />

      <Panel className="p-5">
        <p className="text-sm leading-6 text-[var(--pf-600)]">
          Settings placeholder. Phase 04 will introduce real user identity and protected access.
        </p>
      </Panel>
    </div>
  );
}

export default SettingsPage;