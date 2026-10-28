export default function exportCSV(tx) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [['Date', 'Title', 'Type', 'Category', 'Amount', 'Notes'],
    ...tx.map((t) => [t.date, t.title, t.type, t.category, t.amount, t.notes])];
  const blob = new Blob([rows.map((r) => r.map(esc).join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'transactions.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}
