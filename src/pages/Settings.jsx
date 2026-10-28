import exportCSV from '../utils/exportCSV';
export default function Settings({ tx, theme, setTheme, addSamples, removeSamples, clearAll, notify }) {
  const hasDemo = tx.some((t) => String(t.id).startsWith('demo-'));
  return (
    <section className="card narrow stack">
      <h3>Settings</h3>
      <div className="row between"><span>Theme: {theme}</span><button className="btn ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Switch to {theme === 'dark' ? 'light' : 'dark'}</button></div>
      <div className="row between"><span>Export all transactions</span><button className="btn ghost" onClick={() => (tx.length ? (exportCSV(tx), notify('CSV exported')) : notify('No transactions to export', 'err'))}>Export CSV</button></div>
      <div className="row between"><span>Sample data</span>
        {hasDemo ? <button className="btn ghost" onClick={removeSamples}>Remove samples</button> : <button className="btn ghost" onClick={addSamples}>Add samples</button>}
      </div>
      <div className="row between"><span>Delete all transactions and budget</span><button className="btn danger" onClick={clearAll}>Clear all data</button></div>
    </section>
  );
}
