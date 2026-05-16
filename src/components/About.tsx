import { motion } from 'motion/react';

export default function About() {
  const stats = [
    { label: 'Years Experience', value: '08+' },
    { label: 'Projects Completed', value: '120+' },
    { label: 'Happy Clients', value: '50+' },
    { label: 'Design Awards', value: '04' },
  ];

  const highlights = [
    {
      title: 'Philosophy',
      content: 'I believe that great design is not just how it looks, but how it works. My approach merges aesthetic excellence with functional precision to create digital products that leave a lasting impact.'
    },
    {
      title: 'Excellence',
      content: 'Every pixel is intentional. I focus on the micro-interactions and subtle details that elevate a standard interface into a premium digital experience that users love.'
    }
  ];

  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 border-t border-border-theme">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-8">About Me</h2>
            <h3 className="text-5xl md:text-7xl font-display font-black text-fg-main leading-tight uppercase tracking-tighter mb-12">
              Driven by <span className="text-gray-500 opacity-40">Precision</span>,<br />
              Inspired by Minimalist <span className="text-gray-500 opacity-40">Form</span>.
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-12">
              {highlights.map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-[12px] font-black uppercase tracking-widest text-fg-main border-l-2 border-accent pl-4">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-bg-page border border-border-theme p-12 flex flex-col justify-center items-center text-center group hover:border-accent transition-colors"
              >
                <span className="text-5xl md:text-6xl font-display font-black text-fg-main group-hover:text-accent transition-colors">
                  {stat.value}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mt-4">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
