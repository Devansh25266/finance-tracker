export default function SummaryCard({ label, value, sub, tone, icon: Icon }) {
  return (
    <div className="card summary">
      <div className={`chip ${tone}`}><Icon size={18} /></div>
      <div>
        <div className="muted">{label}</div>
        <div className={`big ${tone}`}>{value}</div>
        {sub && <div className="muted small">{sub}</div>}
      </div>
    </div>
  );
}
