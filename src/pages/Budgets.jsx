import { useState } from 'react';
import BudgetCard from '../components/BudgetCard';
import { monthSpent } from '../utils/calculateTotals';
export default function Budgets({ tx, budget, setBudget, notify }) {
  const [val, setVal] = useState(budget || '');
  const spent = monthSpent(tx, new Date().toISOString().slice(0, 7));
  const save = (e) => {
    e.preventDefault();
    const n = Number(val);
    if (!Number.isFinite(n) || n <= 0) return notify('Enter a budget greater than 0', 'err');
    setBudget(n);
    notify('Budget saved');
  };
  return (
    <section className="card narrow">
      <h3>Monthly budget</h3>
      <form className="row" onSubmit={save}>
        <label className="grow">Budget (₹)<input type="number" min="0" value={val} onChange={(e) => setVal(e.target.value)} /></label>
        <button className="btn primary" style={{ marginBottom: 12 }}>Save budget</button>
      </form>
      <BudgetCard budget={Number(budget) || 0} spent={spent} />
    </section>
  );
}
