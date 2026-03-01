import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Home, 
  LayoutDashboard, 
  Target, 
  Heart, 
  MessageSquare, 
  Users,
  GraduationCap,
  Compass,
  User,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cluster-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        // Not logged in
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cluster-theme', theme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.body.className = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
    { name: 'Career Counselor', icon: Compass, page: 'CareerCounselor' },
    { name: 'Aptitude Quiz', icon: Target, page: 'AptitudeQuiz' },
    { name: 'Interest Finder', icon: Heart, page: 'InterestFinder' },
    { name: 'AI Chatbot', icon: MessageSquare, page: 'AIChatbot' },
    { name: 'Counselors', icon: Users, page: 'Counselors' },
    { name: 'College Advisor', icon: GraduationCap, page: 'CollegeAdvisor' }
  ];

  // Don't show navigation on Home page
  if (currentPageName === 'Home') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${
        theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6963282ea63000cdf9fb0541/9fb337844_image.png" 
                  alt="Cluster Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className={`text-xl font-bold ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' 
                  : 'text-gray-900'
              }`}>
                Cluster
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(1, 6).map((item) => (
                <Link key={item.page} to={createPageUrl(item.page)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${
                      currentPageName === item.page
                        ? theme === 'dark' ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                        : theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {!isLoading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Link to={createPageUrl('Profile')}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                        >
                          <User className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">{user.full_name?.split(' ')[0]}</span>
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => base44.auth.redirectToLogin()}
                      className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-sm"
                    >
                      Sign In
                    </Button>
                  )}
                </>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 top-16 z-40 lg:hidden backdrop-blur-xl border-b ${
              theme === 'dark' ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-gray-200'
            }`}
          >
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      currentPageName === item.page
                        ? theme === 'dark' ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                        : theme === 'dark' ? 'text-gray-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}