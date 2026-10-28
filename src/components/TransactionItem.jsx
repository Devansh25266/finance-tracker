import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
export default function TransactionItem({ t, onEdit, onDelete }) {
  const inc = t.type === 'income';
  return (
    <tr>
      <td><strong>{t.title}</strong>{t.notes && <div className="muted small">{t.notes}</div>}</td>
      <td className="hide-sm">{t.category}</td>
      <td className="hide-sm">{t.date}</td>
      <td className={inc ? 'green amt' : 'red amt'}>{inc ? '+' : '−'}{formatCurrency(t.amount)}</td>
      <td className="actions">
        <button className="icon-btn" aria-label={`Edit ${t.title}`} onClick={() => onEdit(t)}><Pencil size={16} /></button>
        <button className="icon-btn" aria-label={`Delete ${t.title}`} onClick={() => onDelete(t.id)}><Trash2 size={16} /></button>
      </td>
    </tr>
  );
}
