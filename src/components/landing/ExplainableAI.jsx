import React from 'react';
import { motion } from 'framer-motion';
import { Eye, FileText, BarChart3, CheckCircle2 } from 'lucide-react';

export default function ExplainableAI() {
  const features = [
    {
      icon: Eye,
      title: "Transparent Reasoning",
      description: "See exactly why each career is recommended with detailed explanations of matching factors."
    },
    {
      icon: FileText,
      title: "Decision Factors",
      description: "Understand which skills, interests, and traits influenced your personalized recommendations."
    },
    {
      icon: BarChart3,
      title: "Confidence Scores",
      description: "Every recommendation comes with a confidence percentage showing how well it matches your profile."
    },
    {
      icon: CheckCircle2,
      title: "Verifiable Results",
      description: "Cross-reference AI suggestions with real career data and expert validation."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
              Transparency
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explainable{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We believe in transparent AI. Every recommendation comes with clear explanations, 
              so you understand not just what career suits you, but why it's the perfect match.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* AI Explanation Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">AI Explanation</h4>
                  <p className="text-gray-500 text-sm">Career Match Analysis</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cyan-400 font-medium">Software Engineer</span>
                    <span className="text-emerald-400 font-bold">94%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300">High analytical thinking score</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300">Strong problem-solving interest</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-gray-300">Technical aptitude match</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}