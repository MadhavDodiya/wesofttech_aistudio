import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const categories = ['All', 'Design', 'Development', 'AI'];

const projects = [
  {
    title: 'Lumina Engine',
    category: 'Development',
    image: 'https://picsum.photos/seed/lumina/800/600',
    images: [
      'https://picsum.photos/seed/lumina1/800/600',
      'https://picsum.photos/seed/lumina2/800/600',
      'https://picsum.photos/seed/lumina3/800/600',
    ],
    link: '#',
    description: 'A high-performance graphics engine built with C++ and Vulkan, focusing on real-time ray tracing and advanced light simulation.',
    challenge: 'Achieving stable 60FPS on mid-range hardware while implementing complex global illumination and real-time reflections.',
    solution: 'Developed a custom spatial acceleration structure and optimized the shader pipeline using compute shaders for asynchronous lighting calculations.',
    technologies: ['C++', 'Vulkan', 'GLSL', 'Thread Building Blocks'],
    client: 'Lumina Interactive',
    year: '2024',
    role: 'Lead Graphics Engineer',
  },
  {
    title: 'Atlas Branding',
    category: 'Design',
    image: 'https://picsum.photos/seed/atlas/800/600',
    images: [
      'https://picsum.photos/seed/atlas1/800/600',
      'https://picsum.photos/seed/atlas2/800/600',
      'https://picsum.photos/seed/atlas3/800/600',
    ],
    link: '#',
    description: 'A comprehensive brand identity overhaul for a global logistics firm, including logo design, typography systems, and digital guidelines.',
    challenge: 'Creating a modern identity that respects a 30-year legacy while appealing to a new generation of tech-savvy clients.',
    solution: 'Designed a modular logo system and a bold, high-contrast color palette, paired with a custom variable typeface that scales across all platforms.',
    technologies: ['Adobe Illustrator', 'Figma', 'Brand Strategy'],
    client: 'Atlas Global Logistics',
    year: '2023',
    role: 'Senior Brand Designer',
  },
  {
    title: 'Voyage AI',
    category: 'AI',
    image: 'https://picsum.photos/seed/voyage/800/600',
    images: [
      'https://picsum.photos/seed/voyage1/800/600',
      'https://picsum.photos/seed/voyage2/800/600',
      'https://picsum.photos/seed/voyage3/800/600',
    ],
    link: '#',
    description: 'An AI-powered travel assistant that personalizes itineraries based on real-time data and user preferences.',
    challenge: 'Processing thousands of disparate data points from various APIs to provide instant, coherent travel recommendations.',
    solution: 'Implemented a multi-agent AI architecture and a robust caching layer to ensure lightning-fast responses without sacrificing accuracy.',
    technologies: ['Python', 'PyTorch', 'Next.js', 'PostgreSQL'],
    client: 'Voyage Travel Solutions',
    year: '2024',
    role: 'Full Stack AI Developer',
  },
  {
    title: 'Aether OS',
    category: 'Design',
    image: 'https://picsum.photos/seed/aether/800/600',
    images: [
      'https://picsum.photos/seed/aether1/800/600',
      'https://picsum.photos/seed/aether2/800/600',
      'https://picsum.photos/seed/aether3/800/600',
    ],
    link: '#',
    description: 'A minimalist operating system concept designed for distraction-free creative workflows.',
    challenge: 'Designing an interface that stays invisible during work but provides powerful tools instantly when needed.',
    solution: 'Utilized gesture-based navigation and a hierarchical "focus-mode" architecture that hides all non-essential UI elements dynamically.',
    technologies: ['Figma', 'Prototype.io', 'Motion Design'],
    client: 'Aether Technologies',
    year: '2022',
    role: 'UI/UX Visionary',
  },
  {
    title: 'Flux MERN',
    category: 'Development',
    image: 'https://picsum.photos/seed/flux/800/600',
    images: [
      'https://picsum.photos/seed/flux1/800/600',
      'https://picsum.photos/seed/flux2/800/600',
      'https://picsum.photos/seed/flux3/800/600',
    ],
    link: '#',
    description: 'A scalable full-stack application built with the MERN stack, featuring real-time data synchronization and a modular architecture.',
    challenge: 'Ensuring zero-latency data sync between multiple users in a high-traffic collaborative environment.',
    solution: 'Leveraged Redis for state management and Socket.io for bidirectional communication, resulting in sub-100ms sync times.',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    client: 'Flux Digital',
    year: '2023',
    role: 'Core Contributor',
  },
  {
    title: 'Neon Python',
    category: 'Development',
    image: 'https://picsum.photos/seed/neon/800/600',
    images: [
      'https://picsum.photos/seed/neon1/800/600',
      'https://picsum.photos/seed/neon2/800/600',
      'https://picsum.photos/seed/neon3/800/600',
    ],
    link: '#',
    description: 'A developer-centric framework for building high-performance CLI tools with Python.',
    challenge: 'Making complex terminal interactions intuitive and easy for developers to implement without boilerplate.',
    solution: 'Designed a decorator-based API with automatic documentation generation and a suite of high-fidelity UI components for the terminal.',
    technologies: ['Python', 'Click', 'Rich', 'Pytest'],
    client: 'Neon Open Source',
    year: '2024',
    role: 'Creator & Maintainer',
  },
];

type Project = typeof projects[number];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIdx((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIdx((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-[10px] tracking-[0.4em] text-accent uppercase font-black mb-6">Recent Projects</h2>
          <p className="text-5xl md:text-7xl font-display font-black text-fg-main leading-none uppercase tracking-tighter">
            Selected <span className="text-gray-500 opacity-40">Works</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => {
            const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 border transition-all cursor-pointer flex items-center gap-2 ${
                  activeCategory === cat 
                    ? 'bg-accent text-black border-accent' 
                    : 'text-gray-500 border-border-theme hover:text-fg-main hover:border-gray-500'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[8px] font-bold ${activeCategory === cat ? 'text-black/50' : 'text-gray-600'}`}>
                  [{count}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIdx(0);
              }}
              className="group relative bg-bg-page border border-border-theme p-6 md:p-8 h-[400px] md:h-[500px] flex flex-col justify-end overflow-hidden hover:border-accent transition-colors cursor-pointer"
            >
              <div className="absolute top-8 right-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                / {project.category}
              </div>
              
              <div className="absolute inset-x-0 top-0 h-2/3 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-80">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3 project-idx">0{idx + 1}</p>
                <h3 className="text-3xl font-display font-black text-fg-main uppercase tracking-tighter mb-4">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[8px] font-black uppercase tracking-widest text-gray-500 border border-border-theme px-2 py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="w-12 h-12 border border-border-theme group-hover:border-accent group-hover:bg-accent group-hover:text-black rounded-full flex items-center justify-center transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-bg-page/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full lg:h-auto max-w-6xl bg-bg-page border border-border-theme shadow-2xl flex flex-col lg:flex-row lg:max-h-[90vh] overflow-y-auto lg:overflow-hidden"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-bg-page text-fg-main border border-border-theme hover:border-accent hover:text-accent transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="w-full lg:w-3/5 h-[30vh] sm:h-[40vh] lg:h-auto overflow-hidden bg-accent/5 relative group/carousel shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIdx}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    src={selectedProject.images[currentImageIdx]} 
                    alt={`${selectedProject.title} screenshot ${currentImageIdx + 1}`} 
                    className="w-full h-full object-cover lg:grayscale lg:opacity-80 lg:group-hover/carousel:grayscale-0 lg:group-hover/carousel:opacity-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {selectedProject.images.length > 1 && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-100 lg:opacity-0 lg:group-hover/carousel:opacity-100 transition-opacity pointer-events-none">
                      <button 
                        onClick={prevImage}
                        className="p-3 bg-bg-page/80 border border-border-theme text-fg-main hover:border-accent hover:text-accent transition-all backdrop-blur-sm pointer-events-auto"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="p-3 bg-bg-page/80 border border-border-theme text-fg-main hover:border-accent hover:text-accent transition-all backdrop-blur-sm pointer-events-auto"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIdx(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIdx ? 'bg-accent w-4' : 'bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="w-full lg:w-2/5 p-6 md:p-12 flex flex-col overflow-y-auto">
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">/ {selectedProject.category}</span>
                  <div className="h-px flex-1 bg-border-theme" />
                </div>

                <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-fg-main uppercase tracking-tighter mb-6 md:mb-8 leading-tight">
                  {selectedProject.title}
                </h3>

                <div className="space-y-6 md:space-y-8 flex-1">
                  <div className="space-y-3 md:space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Overview</h4>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">{selectedProject.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-accent">The Challenge</h4>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light italic border-l border-accent/30 pl-4">
                        {selectedProject.challenge}
                      </p>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-green-500">The Solution</h4>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light border-l border-green-500/30 pl-4">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-6 md:gap-8">
                    <div className="space-y-2 md:space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Client</h4>
                      <p className="text-fg-main text-[11px] md:text-sm font-bold uppercase tracking-wider">{selectedProject.client}</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Year</h4>
                      <p className="text-fg-main text-[11px] md:text-sm font-bold uppercase tracking-wider">{selectedProject.year}</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Role</h4>
                      <p className="text-fg-main text-[11px] md:text-sm font-bold uppercase tracking-wider">{selectedProject.role}</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Technologies</h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {selectedProject.technologies.map(tech => (
                          <span key={tech} className="text-[8px] md:text-[9px] px-2 py-0.5 md:py-1 border border-border-theme text-gray-500 font-bold uppercase tracking-widest">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 md:mt-12 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Visual Gallery</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedProject.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIdx(i)}
                        className={`aspect-video overflow-hidden border ${i === currentImageIdx ? 'border-accent' : 'border-border-theme'} transition-all`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border-theme flex items-center justify-between">
                  <a 
                    href={selectedProject.link}
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-accent hover:text-fg-main transition-colors group/link"
                  >
                    View Case Study
                    <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
