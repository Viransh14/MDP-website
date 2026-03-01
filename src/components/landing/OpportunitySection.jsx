import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, TrendingUp, Zap, Globe } from 'lucide-react';

export default function OpportunitySection() {
  const opportunities = [
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "Fast-track your career growth with AI-driven insights that identify the best opportunities aligned with your potential.",
      stat: "3x",
      statLabel: "Faster career decisions"
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Our AI analyzes thousands of career paths to find the ones that perfectly match your unique combination of skills and interests.",
      stat: "98%",
      statLabel: "Match accuracy"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with certified counselors, industry mentors, and successful professionals who can guide your journey.",
      stat: "500+",
      statLabel: "Expert mentors"
    },
    {
      icon: TrendingUp,
      title: "Future-Ready Skills",
      description: "Stay ahead with real-time insights into emerging careers, in-demand skills, and industry trends.",
      stat: "24/7",
      statLabel: "Market updates"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
            <Zap className="inline w-4 h-4 mr-1" />
            The Opportunity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Unlock Your{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Full Potential
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform career uncertainty into confident action with data-driven insights and expert guidance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((opp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <opp.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{opp.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{opp.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        {opp.stat}
                      </span>
                      <span className="text-gray-500 text-sm">{opp.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Reach Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Join 10,000+ Students</h3>
                <p className="text-gray-400">Who found their dream careers with Cluster</p>
              </div>
            </div>
            <div className="flex gap-8">
              {[
                { value: "50+", label: "Countries" },
                { value: "500+", label: "Careers" },
                { value: "96%", label: "Success Rate" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}