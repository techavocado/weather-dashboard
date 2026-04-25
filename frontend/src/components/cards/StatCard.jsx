import "./StatCard.css";

export default function StatCard({ title, value, unit }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>

      <h2 className="card-value">
        {value} <span>{unit}</span>
      </h2>
    </div>
  );
}