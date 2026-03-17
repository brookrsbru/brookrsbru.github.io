import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Layout, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Hero Section */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-8"
          >
            <Calculator size={32} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Excel Formula <span className="text-blue-600">Architect</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-600 max-w-2xl mb-10 leading-relaxed"
          >
            A professional workspace for building complex Excel formulas with ease. 
            Navigate a massive grid, use smart presets, and export production-ready formulas.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link 
              to="/builder" 
              className="px-8 py-4 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-zinc-900/10"
            >
              Launch Builder <ChevronRight size={20} />
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-semibold hover:bg-zinc-50 transition-all flex items-center gap-2"
            >
              <Github size={20} /> View on GitHub
            </a>
          </motion.div>
        </div>
      </header>

      {/* Navigation / Features Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Massive Grid</h3>
            <p className="text-zinc-600 leading-relaxed">
              Navigate from A to ZZZ with a high-performance virtualized grid that handles thousands of rows and columns.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Calculator size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Formula Presets</h3>
            <p className="text-zinc-600 leading-relaxed">
              Quickly insert complex snippets like IFERROR, VLOOKUP, and custom HTML-ready formatting tags.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm"
          >
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
              <ExternalLink size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Ready to Deploy</h3>
            <p className="text-zinc-600 leading-relaxed">
              Copy your formulas with a single click and paste them directly into your spreadsheets or GitHub Pages projects.
            </p>
          </motion.div>
        </div>

        {/* Quick Links Section */}
        <section className="mt-20 p-10 bg-zinc-900 rounded-3xl text-white overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ready to start building?</h2>
              <p className="text-zinc-400">Open the architect workspace and start crafting your formulas.</p>
            </div>
            <Link 
              to="/builder" 
              className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all whitespace-nowrap"
            >
              Open Workspace
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] -ml-32 -mb-32" />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            <Calculator size={20} className="text-blue-600" />
            Architect
          </div>
          <div className="text-zinc-500 text-sm">
            © 2026 Excel Formula Architect. Built for professional productivity.
          </div>
          <div className="flex gap-6 text-sm font-medium text-zinc-600">
            <Link to="/builder" className="hover:text-blue-600 transition-colors">Builder</Link>
            <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
