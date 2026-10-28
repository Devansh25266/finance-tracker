import { useState } from 'react';
import { INCOME_CATS, EXPENSE_CATS, today } from '../utils/calculateTotals';
export default function TransactionForm({ initial, onSave, onClose }) {
  const editing = !!initial?.id;
  const [f, setF] = useState({ type: 'expense', title: '', amount: '', category: 'Food', date: today(), notes: '', ...initial });
  const [err, setErr] = useState({});
  const cats = f.type === 'income' ? INCOME_CATS : EXPENSE_CATS;
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setType = (type) => setF((p) => ({ ...p, type, category: (type === 'income' ? INCOME_CATS : EXPENSE_CATS)[0] }));
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.title.trim()) er.title = 'Enter a title';
    const amt = Number(f.amount);
    if (!f.amount || !Number.isFinite(amt) || amt <= 0) er.amount = 'Enter an amount greater than 0';
    if (!f.date) er.date = 'Pick a date';
    setErr(er);
    if (Object.keys(er).length) return;
    onSave({ ...f, title: f.title.trim(), amount: Math.round(amt * 100) / 100, id: f.id || crypto.randomUUID?.() || String(Date.now()) });
  };
  return (
    <div className="modal-bg" role="dialog" aria-modal="true" aria-label="Transaction form">
      <form className="modal" onSubmit={submit} noValidate>
        <h2>{editing ? 'Edit transaction' : 'Add transaction'}</h2>
        <div className="seg">
          <button type="button" className={f.type === 'expense' ? 'on red' : ''} onClick={() => setType('expense')}>Expense</button>
          <button type="button" className={f.type === 'income' ? 'on green' : ''} onClick={() => setType('income')}>Income</button>
        </div>
        <label>Title<input value={f.title} onChange={(e) => set('title', e.target.value)} autoFocus />{err.title && <span className="err">{err.title}</span>}</label>
        <div className="two">
          <label>Amount (₹)<input type="number" min="0" step="0.01" value={f.amount} onChange={(e) => set('amount', e.target.value)} />{err.amount && <span className="err">{err.amount}</span>}</label>
          <label>Date<input type="date" value={f.date} onChange={(e) => set('date', e.target.value)} />{err.date && <span className="err">{err.date}</span>}</label>
        </div>
        <label>Category<select value={f.category} onChange={(e) => set('category', e.target.value)}>{cats.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Notes<textarea rows="2" value={f.notes} onChange={(e) => set('notes', e.target.value)} /></label>
        <div className="row end">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn primary">{editing ? 'Save changes' : 'Add transaction'}</button>
        </div>
      </form>
    </div>
  );
}
