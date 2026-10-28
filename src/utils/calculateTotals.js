export const INCOME_CATS = ['Salary', 'Freelance', 'Business', 'Investments', 'Other Income'];
export const EXPENSE_CATS = ['Food', 'Shopping', 'Transport', 'Education', 'Bills', 'Entertainment', 'Healthcare', 'Other Expenses'];
const sum = (a) => a.reduce((s, t) => s + Number(t.amount), 0);
export const today = () => new Date().toISOString().slice(0, 10);
export const calculateTotals = (tx) => {
  const income = sum(tx.filter((t) => t.type === 'income'));
  const expense = sum(tx.filter((t) => t.type === 'expense'));
  return { income, expense, balance: income - expense };
};
export const monthSpent = (tx, month) =>
  sum(tx.filter((t) => t.type === 'expense' && t.date.startsWith(month)));
export const monthlySeries = (tx, n = 6) => {
  const out = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const key = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;
    const inM = tx.filter((t) => t.date.startsWith(key));
    out.push({
      month: m.toLocaleString('en-IN', { month: 'short' }),
      Income: sum(inM.filter((t) => t.type === 'income')),
      Expenses: sum(inM.filter((t) => t.type === 'expense')),
    });
  }
  return out;
};
export const categoryBreakdown = (tx) => {
  const map = {};
  tx.filter((t) => t.type === 'expense').forEach((t) => { map[t.category] = (map[t.category] || 0) + Number(t.amount); });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
};
const pad = (n) => String(n).padStart(2, '0');
export const sampleTransactions = () => {
  const d = new Date();
  const at = (back, day) => {
    const m = new Date(d.getFullYear(), d.getMonth() - back, 1);
    return `${m.getFullYear()}-${pad(m.getMonth() + 1)}-${pad(day)}`;
  };
  const rows = [];
  for (let b = 0; b < 3; b++) {
    rows.push(['Monthly salary', 'income', 'Salary', 60000, at(b, 1)]);
    rows.push(['Groceries', 'expense', 'Food', 6500 + b * 400, at(b, 5)]);
    rows.push(['Electricity bill', 'expense', 'Bills', 2400, at(b, 8)]);
    rows.push(['Metro pass', 'expense', 'Transport', 1500, at(b, 10)]);
    rows.push(['Movie night', 'expense', 'Entertainment', 900, at(b, 15)]);
  }
  rows.push(['Logo project', 'income', 'Freelance', 12000, at(0, 3)]);
  return rows.map(([title, type, category, amount, date], i) => ({ id: `demo-${i}`, title, type, category, amount, date, notes: 'Sample data' }));
};
