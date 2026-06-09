import Card from "./Card.jsx";

function StatCard({ label, value, helper }) {
  return (
    <Card className="pf-card-hover">
      <p className="text-sm text-[#7a665e]">{label}</p>
      <h3 className="mt-2 text-3xl font-semibold text-[#2f2420]">{value}</h3>
      {helper && <p className="mt-2 text-sm text-[#8b756c]">{helper}</p>}
    </Card>
  );
}

export default StatCard;