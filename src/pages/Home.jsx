import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import ProblemStatement from '../components/landing/ProblemStatement';
import OpportunitySection from '../components/landing/OpportunitySection';
import OurApproach from '../components/landing/OurApproach';
import ModulesShowcase from '../components/landing/ModulesShowcase';
import ExplainableAI from '../components/landing/ExplainableAI';
import TechStack from '../components/landing/TechStack';
import TeamSection from '../components/landing/TeamSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight, Brain } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />
      <ProblemStatement />
      <OpportunitySection />
      <OurApproach />
      <ModulesShowcase />
      <ExplainableAI />
      <TechStack />
      <TeamSection />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Discover Your{' '}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Dream Career?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of students who have found their perfect career path with Cluster
            </p>
            <Link to={createPageUrl('Dashboard')}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-violet-500/30"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6963282ea63000cdf9fb0541/9fb337844_image.png" 
                  alt="Cluster Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">Cluster</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Cluster AI Career Counselor. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to={createPageUrl('Home')} className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link>
              <Link to={createPageUrl('Dashboard')} className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link>
              <Link to={createPageUrl('AptitudeQuiz')} className="text-gray-400 hover:text-white text-sm transition-colors">Quiz</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}