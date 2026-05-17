import { motion, AnimatePresence } from 'motion/react';
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
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
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
        <div className="flex items-center md:hidden gap-1">
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
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-bg-page flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="text-2xl font-display font-black tracking-tighter text-fg-main uppercase">
                WesoftTech<span className="text-accent">.</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-fg-main"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-display font-black uppercase tracking-tighter text-fg-main hover:text-accent transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-border-theme flex flex-col gap-6">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="w-12 h-12 rounded-full border border-border-theme" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-border-theme flex items-center justify-center">
                        <UserIcon size={24} />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-fg-main">{user.displayName}</p>
                      <button 
                        onClick={() => logout()}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center justify-center gap-4 bg-accent text-black p-6 text-[12px] font-black uppercase tracking-[0.3em]"
                >
                  <LogIn size={20} />
                  Login with Google
                </button>
              )}
              
              <a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center bg-fg-main text-bg-page p-6 text-[12px] font-black uppercase tracking-[0.3em]"
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
