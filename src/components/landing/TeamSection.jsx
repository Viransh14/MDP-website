import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Database, Palette, Cpu, FileText } from 'lucide-react';

export default function TeamSection() {
  const team = [
    {
      name: "Viransh Jain",
      role: "Co-Leader & Backend Developer",
      icon: Database,
      color: "from-violet-500 to-purple-600",
      avatar: "VJ"
    },
    {
      name: "Dhruvika Varshney",
      role: "Backend Developer",
      icon: Code,
      color: "from-blue-500 to-cyan-600",
      avatar: "DV"
    },
    {
      name: "M Samyuktha",
      role: "Frontend Developer",
      icon: Palette,
      color: "from-pink-500 to-rose-600",
      avatar: "MS"
    },
    {
      name: "Jothirvishal R",
      role: "Technology Advisor",
      icon: Cpu,
      color: "from-emerald-500 to-teal-600",
      avatar: "JR"
    },
    {
      name: "D Supriya Reddy",
      role: "Data Provider",
      icon: FileText,
      color: "from-amber-500 to-orange-600",
      avatar: "DS"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-medium mb-4">
            The Creators
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate individuals dedicated to transforming career guidance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:border-slate-600/50 transition-all duration-300">
                {/* Avatar */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl font-bold text-white">{member.avatar}</span>
                </div>

                {/* Role Icon */}
                <div className="w-10 h-10 mx-auto -mt-7 mb-3 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
                  <member.icon className="w-5 h-5 text-gray-400" />
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-violet-500/30 transition-colors">
                    <Github className="w-4 h-4 text-gray-400" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                    <Linkedin className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}