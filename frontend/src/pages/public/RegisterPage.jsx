import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";

function RegisterPage() {
  return (
    <section className="pf-container flex justify-center py-16">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-[#2f2420]">Create account</h1>
        <p className="mt-2 text-sm text-[#7a665e]">
          Candidate registration will be connected in Phase 04.
        </p>

        <form className="mt-6 space-y-4">
          <input className="w-full rounded-lg border border-[#eadfd7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#7f1d1d]" placeholder="Full name" />
          <input className="w-full rounded-lg border border-[#eadfd7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#7f1d1d]" placeholder="Email address" />
          <input className="w-full rounded-lg border border-[#eadfd7] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#7f1d1d]" placeholder="Password" type="password" />

          <Link to="/dashboard">
            <Button className="w-full" type="button">
              Create account
            </Button>
          </Link>
        </form>

        <p className="mt-6 text-center text-sm text-[#7a665e]">
          Already have an account?{" "}
          <Link className="font-medium text-[#7f1d1d]" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </section>
  );
}

export default RegisterPage;