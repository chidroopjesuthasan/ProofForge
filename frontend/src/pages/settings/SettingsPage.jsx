import Card from "../../components/ui/Card.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="User profile, preferences, and account settings will be connected after authentication."
      />

      <Card>
        <p className="text-sm text-[#7a665e]">
          Settings placeholder.
        </p>
      </Card>
    </div>
  );
}

export default SettingsPage;