import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Users, HelpCircle } from 'lucide-react';

export default function ProblemStatement() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Career Confusion",
      description: "72% of students feel lost when choosing their career path, leading to wrong decisions",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: TrendingDown,
      title: "Skill Mismatch",
      description: "40% of graduates work in fields unrelated to their degrees, wasting years of education",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Users,
      title: "Limited Access",
      description: "Quality career counseling is expensive and inaccessible to most students",
      color: "from-yellow-500 to-green-500"
    },
    {
      icon: HelpCircle,
      title: "Outdated Guidance",
      description: "Traditional methods don't consider rapidly evolving job markets and new career paths",
      color: "from-green-500 to-cyan-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-4">
            The Challenge
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            The Problem We're{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Solving
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Millions of students struggle with career decisions every year, 
            often leading to dissatisfaction and wasted potential
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
              />
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 h-full hover:border-slate-600/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <problem.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{problem.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}