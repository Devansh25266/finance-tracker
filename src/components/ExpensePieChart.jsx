import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { categoryBreakdown } from '../utils/calculateTotals';
import { formatCurrency } from '../utils/formatCurrency';
const COLORS = ['#dc2626', '#ea580c', '#d97706', '#0d9488', '#2563eb', '#7c3aed', '#db2777', '#64748b'];
export default function ExpensePieChart({ tx }) {
  const data = categoryBreakdown(tx);
  if (!data.length) return <div className="empty"><p>No expenses yet.</p></div>;
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)' }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
