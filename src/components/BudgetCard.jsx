import { AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
export default function BudgetCard({ budget, spent }) {
  if (!budget) return <p className="muted">No monthly budget set yet. Set one to track your spending.</p>;
  const pct = Math.min(100, (spent / budget) * 100);
  const over = spent > budget;
  return (
    <div>
      <div className="row between"><span>{formatCurrency(spent)} spent</span><span className="muted">of {formatCurrency(budget)}</span></div>
      <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin="0" aria-valuemax="100">
        <div className={over ? 'fill red-bg' : pct > 80 ? 'fill amber-bg' : 'fill green-bg'} style={{ width: `${pct}%` }} />
      </div>
      {over
        ? <p className="warn"><AlertTriangle size={16} /> Over budget by {formatCurrency(spent - budget)}</p>
        : <p className="muted">{formatCurrency(budget - spent)} left this month</p>}
    </div>
  );
}
