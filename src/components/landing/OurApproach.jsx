import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Cpu, BarChart3, Shield, ArrowRight } from 'lucide-react';

export default function OurApproach() {
  const approaches = [
    {
      step: "01",
      icon: Cpu,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your interests, skills, personality traits, and academic background to create a comprehensive profile.",
      color: "violet"
    },
    {
      step: "02",
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "We leverage real-time job market data and industry trends to provide relevant and future-proof career recommendations.",
      color: "blue"
    },
    {
      step: "03",
      icon: Lightbulb,
      title: "Personalized Guidance",
      description: "Receive tailored career paths with step-by-step roadmaps, skill gap analysis, and actionable recommendations.",
      color: "cyan"
    },
    {
      step: "04",
      icon: Shield,
      title: "Expert Validation",
      description: "AI recommendations are validated by professional career counselors and psychologists for accuracy and reliability.",
      color: "emerald"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-medium mb-4">
            Our Solution
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Approach
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A revolutionary methodology combining artificial intelligence with human expertise
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/30 via-blue-500/30 via-cyan-500/30 to-emerald-500/30 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approaches.map((approach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-300 group">
                  {/* Step Number */}
                  <div className={`absolute -top-4 left-6 px-3 py-1 bg-${approach.color}-500/20 border border-${approach.color}-500/30 rounded-full`}>
                    <span className={`text-${approach.color}-400 text-sm font-bold`}>{approach.step}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${approach.color}-500/20 to-${approach.color}-500/5 border border-${approach.color}-500/20 flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                    <approach.icon className={`w-8 h-8 text-${approach.color}-400`} />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">{approach.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{approach.description}</p>
                </div>

                {/* Arrow */}
                {index < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}