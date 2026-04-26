import "./StatCard.css";

export default function StatCard({ sunrise , sunset }) {
  return (
    <div className="card" style={{ width: "250px" }}>
      <div>SunRise At : {sunrise}</div>
      <div>Sunset At : {sunset}</div>
    </div>
  );
}