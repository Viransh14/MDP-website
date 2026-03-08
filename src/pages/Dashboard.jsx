import React, { useState, useEffect } from 'react';
import { invokeLLM } from '../api/ChatClient';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  MessageSquare, 
  GraduationCap, 
  TrendingUp,
  Award,
  BookOpen,
  Compass,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        // User not logged in
      }
    };
    loadUser();
  }, []);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => base44.entities.StudentProfile.filter({ user_email: user?.email }),
    enabled: !!user?.email
  });

  const { data: quizResults } = useQuery({
    queryKey: ['quizResults', user?.email],
    queryFn: () => base44.entities.QuizResult.filter({ user_email: user?.email }),
    enabled: !!user?.email
  });

  const studentProfile = profile?.[0];
  const latestQuiz = quizResults?.[0];

  const quickActions = [
    { 
      title: "Career Counselor", 
      desc: "Get AI recommendations", 
      icon: Compass, 
      link: "CareerCounselor",
      gradient: "from-violet-500 to-purple-600"
    },
    { 
      title: "Aptitude Quiz", 
      desc: "Test your skills", 
      icon: Target, 
      link: "AptitudeQuiz",
      gradient: "from-blue-500 to-cyan-600"
    },
    { 
      title: "Interest Finder", 
      desc: "Discover passions", 
      icon: Sparkles, 
      link: "InterestFinder",
      gradient: "from-pink-500 to-rose-600"
    },
    { 
      title: "AI Chatbot", 
      desc: "Ask anything", 
      icon: MessageSquare, 
      link: "AIChatbot",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  const skillData = studentProfile?.quiz_scores ? [
    { skill: 'Analytical', value: studentProfile.quiz_scores.analytical || 0 },
    { skill: 'Creative', value: studentProfile.quiz_scores.creative || 0 },
    { skill: 'Social', value: studentProfile.quiz_scores.social || 0 },
    { skill: 'Practical', value: studentProfile.quiz_scores.practical || 0 },
    { skill: 'Leadership', value: studentProfile.quiz_scores.leadership || 0 }
  ] : [
    { skill: 'Analytical', value: 0 },
    { skill: 'Creative', value: 0 },
    { skill: 'Social', value: 0 },
    { skill: 'Practical', value: 0 },
    { skill: 'Leadership', value: 0 }
  ];

  const progressData = [
    { name: 'Week 1', progress: 20 },
    { name: 'Week 2', progress: 35 },
    { name: 'Week 3', progress: 50 },
    { name: 'Week 4', progress: 75 },
    { name: 'Week 5', progress: 90 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-gray-50 via-white to-gray-100 p-4 md:p-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{user?.full_name || 'Student'}</span>
          </h1>
          <p className="dark:text-gray-400 text-gray-600">Track your career discovery journey</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Career Matches", value: studentProfile?.predicted_careers?.length || 0, icon: Award, color: "violet" },
            { label: "Quizzes Taken", value: quizResults?.length || 0, icon: Target, color: "blue" },
            { label: "Skills Mapped", value: Object.keys(studentProfile?.quiz_scores || {}).length, icon: BarChart3, color: "emerald" },
            { label: "Profile Completion", value: studentProfile ? "80%" : "20%", icon: Users, color: "pink" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="dark:bg-slate-800/50 dark:border-slate-700/50 bg-white border-gray-200 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="dark:text-gray-400 text-gray-600 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold dark:text-white text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link to={createPageUrl(action.link)}>
                <Card className="bg-slate-800/50 border-slate-700/50 hover:border-violet-500/50 transition-all cursor-pointer group backdrop-blur">
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                    <p className="text-gray-400 text-sm">{action.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Skills Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-400" />
                  Skill Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {skillData.some(s => s.value > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={skillData}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                      <Radar
                        name="Skills"
                        dataKey="value"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                      <p>Take the aptitude quiz to see your skills</p>
                      <Link to={createPageUrl('AptitudeQuiz')}>
                        <Button className="mt-4 bg-violet-600 hover:bg-violet-700">
                          Start Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Predictions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Career Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentProfile?.predicted_careers?.length > 0 ? (
                  <div className="space-y-4">
                    {studentProfile.predicted_careers.slice(0, 4).map((career, i) => (
                      <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{career.career}</span>
                          <span className={`text-sm font-bold ${career.confidence >= 80 ? 'text-emerald-400' : career.confidence >= 60 ? 'text-yellow-400' : 'text-orange-400'}`}>
                            {career.confidence}% match
                          </span>
                        </div>
                        <Progress value={career.confidence} className="h-2 bg-slate-700" />
                        {career.match_reasons && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {career.match_reasons.slice(0, 3).map((reason, j) => (
                              <span key={j} className="text-xs px-2 py-0.5 bg-violet-500/20 text-violet-300 rounded-full">
                                {reason}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Compass className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                      <p>Complete the career assessment to see predictions</p>
                      <Link to={createPageUrl('CareerCounselor')}>
                        <Button className="mt-4 bg-cyan-600 hover:bg-cyan-700">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Your Journey Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                  <YAxis tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorProgress)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}