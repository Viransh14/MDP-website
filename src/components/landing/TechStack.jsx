import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Cloud, Lock, Zap, Globe } from 'lucide-react';

export default function TechStack() {
  const technologies = [
    { icon: Brain, name: "Advanced LLM", desc: "GPT-4 powered" },
    { icon: Database, name: "Vector DB", desc: "Semantic search" },
    { icon: Cloud, name: "Cloud Native", desc: "Auto-scaling" },
    { icon: Lock, name: "Security", desc: "End-to-end encrypted" },
    { icon: Zap, name: "Real-time", desc: "Instant responses" },
    { icon: Globe, name: "Global CDN", desc: "Low latency" }
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHYyaC0ydjRoMnYyaDR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technology{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with cutting-edge technologies for reliability, speed, and intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-xl p-4 text-center group hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-all">
                <tech.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-white font-medium text-sm mb-1">{tech.name}</h4>
              <p className="text-gray-500 text-xs">{tech.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-800/20 backdrop-blur border border-slate-700/50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">System Architecture</h3>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
            {[
              { label: "User Interface", sub: "React + Tailwind" },
              { label: "API Gateway", sub: "REST + WebSocket" },
              { label: "AI Engine", sub: "LLM Processing" },
              { label: "Data Layer", sub: "Vector + SQL" }
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div className="text-center">
                  <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center mb-2">
                    <span className="text-white font-medium text-sm">{item.label}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{item.sub}</span>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block w-8 h-0.5 bg-gradient-to-r from-violet-500/50 to-cyan-500/50" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}