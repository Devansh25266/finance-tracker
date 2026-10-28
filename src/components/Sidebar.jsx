import { LayoutDashboard, ArrowLeftRight, PiggyBank, Settings, X } from 'lucide-react';
const items = [['Dashboard', LayoutDashboard], ['Transactions', ArrowLeftRight], ['Budgets', PiggyBank], ['Settings', Settings]];
export default function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <span>₹ Finance Tracker</span>
          <button className="icon-btn mobile-only" aria-label="Close menu" onClick={() => setOpen(false)}><X size={18} /></button>
        </div>
        <nav>
          {items.map(([name, Icon]) => (
            <button key={name} className={page === name ? 'nav active' : 'nav'} onClick={() => { setPage(name); setOpen(false); }}>
              <Icon size={18} /> {name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
