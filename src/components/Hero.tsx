import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Status: Available</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-600"> / </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">Freelance Designer</span>
          </div>
          <h1 className="text-[14vw] sm:text-[12vw] md:text-[140px] lg:text-[160px] font-display font-black leading-[0.8] tracking-tight uppercase text-fg-main mb-12">
            DESIGN <br />
            <span className="text-accent">LIMITS</span>
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-t border-border-theme pt-12">
            <h2 className="text-xl md:text-2xl font-light tracking-tight text-gray-400 max-w-sm">
              Crafting high-fidelity digital experiences for forward-thinking brands.
            </h2>
            <p className="w-full md:w-1/3 text-[10px] md:text-[11px] leading-relaxed uppercase tracking-[0.2em] text-gray-600">
              I partner with innovative companies to build memorable identities and seamless interfaces that command attention and drive growth.
            </p>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#portfolio"
              className="w-full sm:flex-1 md:flex-none text-center bg-accent text-black px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 group transition-colors"
            >
              View Portfolio
              <ArrowDownRight size={18} className="group-hover:rotate-45 transition-transform" />
            </motion.a>
            <motion.a
              whileHover={{ backgroundColor: 'var(--fg-main)', color: 'var(--bg-page)' }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="w-full sm:flex-1 md:flex-none text-center border border-border-theme text-fg-main px-10 py-6 text-[11px] font-black uppercase tracking-[0.4em] transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative aspect-video sm:aspect-[21/9] rounded-none overflow-hidden bg-bg-page border border-border-theme"
        >
          <img 
            src="https://picsum.photos/seed/workspace/1920/1080" 
            alt="Professional Designer Workspace" 
            className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
}
