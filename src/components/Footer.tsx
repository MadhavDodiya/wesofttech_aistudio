import { Twitter, Linkedin, Globe, Palette } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-border-theme px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 sm:gap-16">
        <div className="text-2xl md:text-3xl font-display font-black tracking-tighter text-fg-main uppercase">
          WesoftTech<span className="text-accent">.</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
          <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors group">
            <Twitter size={14} className="group-hover:scale-110 transition-transform" />
            <span>Twitter</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors group">
            <Globe size={14} className="group-hover:scale-110 transition-transform" />
            <span>Dribbble</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors group">
            <Palette size={14} className="group-hover:scale-110 transition-transform" />
            <span>Behance</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors group">
            <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="w-full pt-12 border-t border-border-theme flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
            © {new Date().getFullYear()} WesoftTech / Worldwide
          </p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-gray-600">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
