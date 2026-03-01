import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Compass, 
  Heart, 
  MessageSquare, 
  Users, 
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ModulesShowcase() {
  const modules = [
    {
      icon: Compass,
      title: "Career Counselor",
      description: "Get personalized career recommendations based on your unique profile, skills, and aspirations.",
      features: ["AI-powered matching", "Industry insights", "Growth paths"],
      color: "violet",
      link: "CareerCounselor",
      gradient: "from-violet-600 to-purple-600"
    },
    {
      icon: Heart,
      title: "Interest Finder",
      description: "Discover your true interests through our comprehensive personality assessment powered by AI.",
      features: ["Personality analysis", "Interest mapping", "Strength discovery"],
      color: "pink",
      link: "InterestFinder",
      gradient: "from-pink-600 to-rose-600"
    },
    {
      icon: MessageSquare,
      title: "AI Chatbot",
      description: "24/7 career guidance at your fingertips. Ask anything about careers, education, or skills.",
      features: ["Instant responses", "Context-aware", "Personalized advice"],
      color: "blue",
      link: "AIChatbot",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Users,
      title: "Professional Counselors",
      description: "Connect with verified career counselors and psychologists for in-depth guidance.",
      features: ["Expert validation", "1-on-1 sessions", "Certified professionals"],
      color: "emerald",
      link: "Counselors",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      icon: GraduationCap,
      title: "College Advisor",
      description: "Find the perfect college and course that aligns with your career goals and preferences.",
      features: ["College matching", "Course suggestions", "Admission guidance"],
      color: "amber",
      link: "CollegeAdvisor",
      gradient: "from-amber-600 to-orange-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            <Sparkles className="inline w-4 h-4 mr-1" />
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Modules
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive tools designed to guide you at every step of your career journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`${index === 4 ? 'lg:col-start-2' : ''}`}
            >
              <Link to={createPageUrl(module.link)}>
                <div className="h-full bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 group cursor-pointer">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center text-violet-400 text-sm font-medium group-hover:text-violet-300 transition-colors">
                    Explore Module
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}