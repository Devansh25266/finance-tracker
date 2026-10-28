import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import useLocalStorage from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import ConfirmDialog from './components/ConfirmDialog';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Settings from './pages/Settings';
import { sampleTransactions } from './utils/calculateTotals';

export default function App() {
  const [stored, setTx] = useLocalStorage('ft-transactions', []);
  const [budgetRaw, setBudget] = useLocalStorage('ft-budget', 0);
  const [theme, setTheme] = useLocalStorage('ft-theme', 'light');
  const [page, setPage] = useState('Dashboard');
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const tx = (Array.isArray(stored) ? stored : []).filter(
    (t) => t && t.id && typeof t.date === 'string' && typeof t.title === 'string' && Number(t.amount) > 0 && (t.type === 'income' || t.type === 'expense'));
  const budget = Number(budgetRaw) > 0 ? Number(budgetRaw) : 0;

  useEffect(() => { document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light'; }, [theme]);
  const notify = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };
  const ask = (message, fn) => setConfirm({ message, fn });

  const save = (t) => {
    setTx((p) => { const a = Array.isArray(p) ? p : []; return a.some((x) => x.id === t.id) ? a.map((x) => (x.id === t.id ? t : x)) : [t, ...a]; });
    setForm(null);
    notify('Transaction saved');
  };
  const del = (id) => ask('Delete this transaction? This cannot be undone.', () => { setTx((p) => p.filter((x) => x.id !== id)); notify('Transaction deleted'); });
  const addSamples = () => { setTx((p) => [...sampleTransactions(), ...(Array.isArray(p) ? p : [])]); notify('Sample data added'); };
  const removeSamples = () => { setTx((p) => p.filter((t) => !String(t.id).startsWith('demo-'))); notify('Sample data removed'); };
  const clearAll = () => ask('Delete ALL transactions and your budget?', () => { setTx([]); setBudget(0); notify('All data cleared'); });

  const common = { tx, onAdd: () => setForm({}), onEdit: (t) => setForm(t), onDelete: del };
  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} open={menu} setOpen={setMenu} />
      <div className="main">
        <Header title={page} theme={theme} setTheme={setTheme} openMenu={() => setMenu(true)} />
        <main className="content">
          {page === 'Dashboard' && <Dashboard {...common} budget={budget} go={setPage} />}
          {page === 'Transactions' && <Transactions {...common} />}
          {page === 'Budgets' && <Budgets tx={tx} budget={budget} setBudget={setBudget} notify={notify} />}
          {page === 'Settings' && <Settings tx={tx} theme={theme} setTheme={setTheme} addSamples={addSamples} removeSamples={removeSamples} clearAll={clearAll} notify={notify} />}
        </main>
      </div>
      <button className="fab" onClick={() => setForm({})}><Plus size={20} /> <span>Add transaction</span></button>
      {form && <TransactionForm initial={form} onSave={save} onClose={() => setForm(null)} />}
      {confirm && <ConfirmDialog message={confirm.message} onNo={() => setConfirm(null)} onYes={() => { confirm.fn(); setConfirm(null); }} />}
      {toast && <div className={`toast ${toast.type}`} role="status">{toast.msg}</div>}
    </div>
  );
}
