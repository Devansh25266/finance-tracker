import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { monthlySeries } from '../utils/calculateTotals';
import { formatCurrency } from '../utils/formatCurrency';
export default function IncomeExpenseChart({ tx }) {
  const data = monthlySeries(tx);
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted)" />
          <YAxis stroke="var(--muted)" width={50} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
          <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)' }} />
          <Legend />
          <Bar dataKey="Income" fill="#16a34a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#dc2626" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
