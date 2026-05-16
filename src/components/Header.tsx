import { motion } from 'motion/react';
import { Menu, X, Sun, Moon, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { signInWithGoogle, logout, User } from '../lib/firebase';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  user: User | null;
  loading: boolean;
}

export default function Header({ isDark, toggleTheme, user, loading }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogin = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsSigningIn(false);
    }
  };

  const navItems = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-page/80 backdrop-blur-md border-b border-border-theme">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-black tracking-tighter text-fg-main uppercase"
        >
          WesoftTech<span className="text-accent">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-accent transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
          
          <button 
            type="button"
            onClick={toggleTheme}
            className="p-2 text-fg-main hover:text-accent transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {loading || isSigningIn ? (
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end hidden lg:flex">
                <span className="text-[10px] font-bold text-fg-main truncate max-w-[100px]">{user.displayName}</span>
                <button 
                  onClick={() => logout()}
                  className="text-[8px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-border-theme" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-border-theme flex items-center justify-center">
                  <UserIcon size={16} />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isSigningIn}
              className="flex items-center gap-2 px-4 py-2 border border-border-theme text-[10px] font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn size={14} />
              <span>{isSigningIn ? '...' : 'Login'}</span>
            </button>
          )}

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 bg-accent text-black text-[11px] font-black uppercase tracking-widest rounded-none hover:bg-fg-main hover:text-bg-page transition-colors"
          >
            Inquiry
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden gap-2">
          {!(loading || isSigningIn) && !user && (
            <button 
              onClick={handleLogin}
              disabled={isSigningIn}
              className="p-2 text-fg-main disabled:opacity-50"
              aria-label="Login"
            >
              <LogIn size={20} />
            </button>
          )}
          {user && (
             <button 
                onClick={() => logout()}
                className="p-2 text-fg-main"
                aria-label="Logout"
             >
               <LogOut size={20} />
             </button>
          )}
          <button 
            type="button"
            onClick={toggleTheme}
            className="p-2 text-fg-main cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            type="button"
            className="text-fg-main p-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-bg-page border-b border-border-theme overflow-hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-bold uppercase tracking-widest text-fg-main hover:text-accent transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
