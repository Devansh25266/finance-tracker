import TransactionItem from './TransactionItem';
export default function TransactionList({ items, onEdit, onDelete, onAdd }) {
  if (!items.length)
    return (
      <div className="empty">
        <p>No transactions to show.</p>
        {onAdd && <button className="btn primary" onClick={onAdd}>Add a transaction</button>}
      </div>
    );
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Title</th><th className="hide-sm">Category</th><th className="hide-sm">Date</th><th>Amount</th><th><span className="sr">Actions</span></th></tr></thead>
        <tbody>{items.map((t) => <TransactionItem key={t.id} t={t} onEdit={onEdit} onDelete={onDelete} />)}</tbody>
      </table>
    </div>
  );
}
