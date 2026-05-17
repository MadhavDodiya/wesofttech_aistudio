import { motion } from 'motion/react';
import { Globe, Smartphone, Brain, Code, Palette, Terminal, Layers } from 'lucide-react';

const services = [
  {
    icon: <Globe className="text-black" />,
    title: 'Web Site Design',
    description: 'High-performance websites that blend aesthetics with intuitive user experiences. Utilizing Figma for high-fidelity prototyping and focusing on mobile-first responsive design.',
  },
  {
    icon: <Smartphone className="text-black" />,
    title: 'UI & UX Design',
    description: 'Intuitive interface design for web and mobile applications focused on conversion. Implementing user-centric research, wireframing, and rigorous usability testing methodologies.',
  },
  {
    icon: <Brain className="text-black" />,
    title: 'AI / ML',
    description: 'Specialized artificial intelligence and machine learning solutions for modern automation. Leveraging TensorFlow and Scikit-learn for predictive modeling and NLP integration.',
  },
  {
    icon: <Code className="text-black" />,
    title: 'Web Development',
    description: 'Robust and scalable web applications built with performance and security in mind. Employing modern frameworks and SEO-optimized clean code architecture.',
  },
  {
    icon: <Palette className="text-black" />,
    title: 'Graphic Design',
    description: 'Visual storytelling through identity, print, and digital media that commands attention. Hardening brand consistency through creative Adobe Creative Cloud execution.',
  },
  {
    icon: <Terminal className="text-black" />,
    title: 'Python Development',
    description: 'Backend engineering, data processing, and scripting using Python for high efficiency. Utilizing Django and Flask for secure, scalable data-driven automation.',
  },
  {
    icon: <Layers className="text-black" />,
    title: 'MERN Stack',
    description: 'Full-stack mastery using MongoDB, Express, React, and Node.js for modern web platforms. Delivering end-to-end applications with state-of-the-art state management.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-6">Our Capabilities</h2>
            <h3 className="text-4xl md:text-7xl font-display font-black text-fg-main leading-tight md:leading-none uppercase tracking-tighter mb-12">
              Strategic <br />
              Digital <span className="text-gray-500 underline decoration-accent decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">Solutions</span>
            </h3>
            <p className="text-base md:text-lg text-gray-500 mb-12 leading-relaxed max-w-sm font-light">
              I partner with forward-thinking companies to solve complex problems through design and high-performance code. My approach is data-driven, analytical, and deeply creative.
            </p>
            <div className="pt-12 border-t border-border-theme flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">EST. 2024</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">Global Service</span>
            </div>
          </div>

          <div className="flex flex-col">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex justify-between items-baseline border-b border-border-theme py-8 md:py-10 hover:border-accent transition-colors cursor-default"
              >
                <div className="flex flex-col">
                  <h4 className="text-2xl md:text-3xl font-display font-black text-fg-main uppercase tracking-tight group-hover:text-accent transition-colors">{service.title}</h4>
                  <p className="text-gray-600 text-xs md:text-sm mt-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity max-w-sm">{service.description}</p>
                </div>
                <span className="text-xs font-black text-gray-400 group-hover:text-accent transition-colors ml-4">0{idx + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
