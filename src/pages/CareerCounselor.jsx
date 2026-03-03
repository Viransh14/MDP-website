import React, { useState, useEffect } from 'react';
import { base44 } from '../api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  Compass, 
  Sparkles, 
  Target,
  TrendingUp,
  Award,
  ChevronRight,
  Loader2,
  CheckCircle2,
  BookOpen,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

export default function CareerCounselor() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    education_level: '',
    current_field: '',
    skills: '',
    interests: '',
    career_goals: ''
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {}
    };
    loadUser();
  }, []);

  const { data: existingProfile } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => base44.entities.StudentProfile.filter({ user_email: user?.email }),
    enabled: !!user?.email
  });

  useEffect(() => {
    if (existingProfile?.[0]) {
      const profile = existingProfile[0];
      setFormData({
        education_level: profile.education_level || '',
        current_field: profile.current_field || '',
        skills: profile.skills?.join(', ') || '',
        interests: profile.interests?.join(', ') || '',
        career_goals: profile.career_goals || ''
      });
    }
  }, [existingProfile]);

  const handleSubmit = async () => {
    setAnalyzing(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `As an expert AI career counselor, analyze this student profile and provide detailed career recommendations:

        Education Level: ${formData.education_level}
        Current Field/Major: ${formData.current_field}
        Skills: ${formData.skills}
        Interests: ${formData.interests}
        Career Goals: ${formData.career_goals}

        Provide:
        1. Top 5 career recommendations with confidence scores (0-100)
        2. Detailed roadmap for the top career
        3. Skills they should develop
        4. Education paths to consider
        5. Industry insights and job market trends

        Be specific, actionable, and encouraging.`,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            career_recommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  career: { type: "string" },
                  confidence_score: { type: "number" },
                  salary_range: { type: "string" },
                  growth_outlook: { type: "string" },
                  description: { type: "string" },
                  match_reasons: {
                    type: "array",
                    items: { type: "string" }
                  }
                }
              }
            },
            roadmap: {
              type: "object",
              properties: {
                short_term: { type: "array", items: { type: "string" } },
                medium_term: { type: "array", items: { type: "string" } },
                long_term: { type: "array", items: { type: "string" } }
              }
            },
            skills_to_develop: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  skill: { type: "string" },
                  importance: { type: "string" },
                  how_to_learn: { type: "string" }
                }
              }
            },
            education_paths: {
              type: "array",
              items: { type: "string" }
            },
            industry_insights: { type: "string" }
          }
        }
      });

      setRecommendations(response);

      // Save to profile
      if (user?.email) {
        const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
        const interestsArray = formData.interests.split(',').map(s => s.trim()).filter(Boolean);
        
        const profileData = {
          user_email: user.email,
          name: user.full_name,
          education_level: formData.education_level,
          current_field: formData.current_field,
          skills: skillsArray,
          interests: interestsArray,
          career_goals: formData.career_goals,
          predicted_careers: response.career_recommendations.map(c => ({
            career: c.career,
            confidence: c.confidence_score,
            match_reasons: c.match_reasons
          }))
        };

        if (existingProfile?.[0]) {
          await base44.entities.StudentProfile.update(existingProfile[0].id, profileData);
        } else {
          await base44.entities.StudentProfile.create(profileData);
        }
      }

      setStep(3);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <Compass className="w-full h-full text-violet-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Profile</h2>
          <p className="text-gray-400">Our AI is crafting personalized recommendations...</p>
        </motion.div>
      </div>
    );
  }

  if (step === 3 && recommendations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Compass className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Career Roadmap</h1>
            <p className="text-gray-400">Personalized recommendations based on your profile</p>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">AI Analysis Summary</h2>
                    <p className="text-gray-300 leading-relaxed">{recommendations.summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Top Career Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.career_recommendations?.map((career, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="p-5 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-violet-500/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{career.career}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                              {career.salary_range}
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                              {career.growth_outlook}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-2xl font-bold ${
                            career.confidence_score >= 80 ? 'text-emerald-400' :
                            career.confidence_score >= 60 ? 'text-yellow-400' :
                            'text-orange-400'
                          }`}>
                            {career.confidence_score}%
                          </span>
                          <p className="text-xs text-gray-500">Match Score</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{career.description}</p>
                      
                      <Progress value={career.confidence_score} className="h-2 bg-slate-700 mb-3" />
                      
                      <div className="flex flex-wrap gap-2">
                        {career.match_reasons?.map((reason, j) => (
                          <span key={j} className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {reason}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Your Career Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "Short Term (0-6 months)", items: recommendations.roadmap?.short_term, color: "emerald" },
                    { title: "Medium Term (6-18 months)", items: recommendations.roadmap?.medium_term, color: "blue" },
                    { title: "Long Term (1-3 years)", items: recommendations.roadmap?.long_term, color: "violet" }
                  ].map((phase, i) => (
                    <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <h4 className={`font-semibold text-${phase.color}-400 mb-3`}>{phase.title}</h4>
                      <ul className="space-y-2">
                        {phase.items?.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                            <ChevronRight className={`w-4 h-4 mt-0.5 text-${phase.color}-400 flex-shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills to Develop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-pink-400" />
                  Skills to Develop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.skills_to_develop?.map((skill, i) => (
                    <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <h4 className="font-semibold text-white mb-1">{skill.skill}</h4>
                      <span className="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded-full">
                        {skill.importance}
                      </span>
                      <p className="text-gray-400 text-sm mt-2">{skill.how_to_learn}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education Paths & Industry Insights */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                    Education Paths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendations.education_paths?.map((path, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <BookOpen className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                        {path}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-cyan-400" />
                    Industry Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{recommendations.industry_insights}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Link to={createPageUrl('Dashboard')}>
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 px-8">
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-violet-950/20 dark:to-slate-950 from-violet-50 via-white to-gray-50 p-4 md:p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Career Counselor</h1>
          <p className="text-gray-400">Tell us about yourself to get personalized career recommendations</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-violet-500 text-white' : 'bg-slate-700 text-gray-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 2 && <div className={`w-12 h-1 ${step > s ? 'bg-violet-500' : 'bg-slate-700'}`} />}
            </div>
          ))}
        </div>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
          <CardContent className="p-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Education & Background</h2>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">Education Level</Label>
                  <Select
                    value={formData.education_level}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, education_level: value }))}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high_school">High School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Current Field / Major</Label>
                  <Input
                    value={formData.current_field}
                    onChange={(e) => setFormData(prev => ({ ...prev, current_field: e.target.value }))}
                    placeholder="e.g., Computer Science, Business, Arts"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Your Skills (comma separated)</Label>
                  <Input
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    placeholder="e.g., Python, Communication, Problem Solving"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!formData.education_level}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Interests & Goals</h2>

                <div className="space-y-2">
                  <Label className="text-gray-300">Your Interests (comma separated)</Label>
                  <Input
                    value={formData.interests}
                    onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                    placeholder="e.g., Technology, Art, Healthcare, Finance"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Career Goals & Aspirations</Label>
                  <Textarea
                    value={formData.career_goals}
                    onChange={(e) => setFormData(prev => ({ ...prev, career_goals: e.target.value }))}
                    placeholder="Describe your ideal career, work environment, and long-term goals..."
                    className="bg-slate-900/50 border-slate-700 text-white min-h-[120px]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-slate-700 text-gray-300 hover:bg-slate-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.interests}
                    className="flex-1 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500"
                  >
                    Get Recommendations
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}