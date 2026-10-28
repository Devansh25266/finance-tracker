import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import ExpensePieChart from '../components/ExpensePieChart';
import TransactionList from '../components/TransactionList';
import { calculateTotals, monthSpent } from '../utils/calculateTotals';
import { formatCurrency } from '../utils/formatCurrency';
export default function Dashboard({ tx, budget, onAdd, onEdit, onDelete, go }) {
  const t = calculateTotals(tx);
  const spent = monthSpent(tx, new Date().toISOString().slice(0, 7));
  const rate = t.income > 0 ? Math.round((t.balance / t.income) * 100) : 0;
  const recent = [...tx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  return (
    <>
      <div className="grid4">
        <SummaryCard label="Total balance" value={formatCurrency(t.balance)} sub={`Savings rate ${rate}%`} tone={t.balance >= 0 ? 'green' : 'red'} icon={Wallet} />
        <SummaryCard label="Total income" value={formatCurrency(t.income)} tone="green" icon={TrendingUp} />
        <SummaryCard label="Total expenses" value={formatCurrency(t.expense)} tone="red" icon={TrendingDown} />
        <SummaryCard label="Budget this month" value={budget ? `${formatCurrency(spent)} / ${formatCurrency(budget)}` : 'Not set'} tone={budget && spent > budget ? 'red' : 'green'} icon={PiggyBank} />
      </div>
      <div className="grid2">
        <section className="card"><h3>Income vs expenses</h3><IncomeExpenseChart tx={tx} /></section>
        <section className="card"><h3>Expense breakdown</h3><ExpensePieChart tx={tx} /></section>
      </div>
      <section className="card">
        <div className="row between"><h3>Recent transactions</h3><button className="btn ghost" onClick={() => go('Transactions')}>View all</button></div>
        <TransactionList items={recent} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
      </section>
    </>
  );
}
