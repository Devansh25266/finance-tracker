import { Menu, Moon, Sun } from 'lucide-react';
export default function Header({ title, theme, setTheme, openMenu }) {
  return (
    <header className="header">
      <button className="icon-btn mobile-only" aria-label="Open menu" onClick={openMenu}><Menu size={20} /></button>
      <h1>{title}</h1>
      <div className="spacer" />
      <button className="icon-btn" aria-label="Toggle dark mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <div className="avatar" aria-label="Profile">FT</div>
    </header>
  );
}
