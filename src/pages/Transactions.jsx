import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import { INCOME_CATS, EXPENSE_CATS } from '../utils/calculateTotals';
export default function Transactions({ tx, onAdd, onEdit, onDelete }) {
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [cat, setCat] = useState('all');
  const [month, setMonth] = useState('');
  const [sort, setSort] = useState('newest');
  const list = useMemo(() => {
    const r = tx.filter((t) =>
      t.title.toLowerCase().includes(q.toLowerCase()) &&
      (type === 'all' || t.type === type) &&
      (cat === 'all' || t.category === cat) &&
      (!month || t.date.startsWith(month)));
    const s = {
      newest: (a, b) => b.date.localeCompare(a.date),
      oldest: (a, b) => a.date.localeCompare(b.date),
      high: (a, b) => b.amount - a.amount,
      low: (a, b) => a.amount - b.amount,
    }[sort];
    return r.sort(s);
  }, [tx, q, type, cat, month, sort]);
  return (
    <section className="card">
      <div className="filters">
        <label className="search"><Search size={16} /><input placeholder="Search by title" aria-label="Search by title" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expense</option></select>
        <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)}><option value="all">All categories</option>{[...INCOME_CATS, ...EXPENSE_CATS].map((c) => <option key={c}>{c}</option>)}</select>
        <input type="month" aria-label="Month" value={month} onChange={(e) => setMonth(e.target.value)} />
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="high">Highest amount</option><option value="low">Lowest amount</option></select>
      </div>
      <TransactionList items={list} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
    </section>
  );
}
