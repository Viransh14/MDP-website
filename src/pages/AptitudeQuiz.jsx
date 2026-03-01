import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Brain, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2,
  Target,
  Clock,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const questions = [
  {
    id: 1,
    category: "analytical",
    question: "When faced with a complex problem, what's your first instinct?",
    options: [
      { value: "a", text: "Break it down into smaller parts systematically", score: 5 },
      { value: "b", text: "Look for creative, unconventional solutions", score: 3 },
      { value: "c", text: "Discuss it with others to get different perspectives", score: 2 },
      { value: "d", text: "Try practical hands-on approaches", score: 1 }
    ]
  },
  {
    id: 2,
    category: "creative",
    question: "How do you feel about brainstorming new ideas?",
    options: [
      { value: "a", text: "I love it! Ideas flow naturally to me", score: 5 },
      { value: "b", text: "I enjoy it when there's a clear goal", score: 3 },
      { value: "c", text: "I prefer improving existing ideas", score: 2 },
      { value: "d", text: "I'd rather focus on implementation", score: 1 }
    ]
  },
  {
    id: 3,
    category: "social",
    question: "In a team project, what role do you naturally gravitate toward?",
    options: [
      { value: "a", text: "The coordinator who brings everyone together", score: 5 },
      { value: "b", text: "The ideas person with creative input", score: 3 },
      { value: "c", text: "The analyst who researches and organizes", score: 2 },
      { value: "d", text: "The executor who gets things done", score: 1 }
    ]
  },
  {
    id: 4,
    category: "practical",
    question: "How do you prefer to learn new skills?",
    options: [
      { value: "a", text: "Hands-on practice and experimentation", score: 5 },
      { value: "b", text: "Reading documentation and theory first", score: 3 },
      { value: "c", text: "Watching tutorials and demonstrations", score: 2 },
      { value: "d", text: "Learning from a mentor or teacher", score: 1 }
    ]
  },
  {
    id: 5,
    category: "leadership",
    question: "When making important decisions, you typically:",
    options: [
      { value: "a", text: "Take charge and make quick decisions confidently", score: 5 },
      { value: "b", text: "Analyze all options carefully before deciding", score: 3 },
      { value: "c", text: "Seek input from others before finalizing", score: 2 },
      { value: "d", text: "Follow established procedures and guidelines", score: 1 }
    ]
  },
  {
    id: 6,
    category: "analytical",
    question: "How comfortable are you with data and numbers?",
    options: [
      { value: "a", text: "Very comfortable - I enjoy working with data", score: 5 },
      { value: "b", text: "Comfortable when needed for specific tasks", score: 3 },
      { value: "c", text: "I prefer qualitative over quantitative work", score: 2 },
      { value: "d", text: "I try to avoid heavy number crunching", score: 1 }
    ]
  },
  {
    id: 7,
    category: "creative",
    question: "What type of projects excite you most?",
    options: [
      { value: "a", text: "Designing something new from scratch", score: 5 },
      { value: "b", text: "Optimizing existing systems for better results", score: 3 },
      { value: "c", text: "Helping others achieve their goals", score: 2 },
      { value: "d", text: "Managing and organizing operations", score: 1 }
    ]
  },
  {
    id: 8,
    category: "social",
    question: "How do you feel about public speaking or presentations?",
    options: [
      { value: "a", text: "I enjoy it and feel confident presenting", score: 5 },
      { value: "b", text: "I'm comfortable with preparation", score: 3 },
      { value: "c", text: "I prefer smaller group discussions", score: 2 },
      { value: "d", text: "I avoid it when possible", score: 1 }
    ]
  },
  {
    id: 9,
    category: "practical",
    question: "Your ideal work environment would be:",
    options: [
      { value: "a", text: "A lab, workshop, or hands-on setting", score: 5 },
      { value: "b", text: "A creative studio with flexible workspace", score: 3 },
      { value: "c", text: "A busy office with lots of interaction", score: 2 },
      { value: "d", text: "A quiet space for focused analytical work", score: 1 }
    ]
  },
  {
    id: 10,
    category: "leadership",
    question: "How do you handle pressure and deadlines?",
    options: [
      { value: "a", text: "I thrive under pressure and lead others through it", score: 5 },
      { value: "b", text: "I stay calm and methodically work through tasks", score: 3 },
      { value: "c", text: "I collaborate with team members to share the load", score: 2 },
      { value: "d", text: "I prefer planning ahead to avoid last-minute stress", score: 1 }
    ]
  }
];

export default function AptitudeQuiz() {
  const [user, setUser] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

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

  const handleAnswer = (value) => {
    const question = questions[currentQuestion];
    const selectedOption = question.options.find(o => o.value === value);
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: {
        question_id: question.id,
        answer: value,
        score: selectedOption.score,
        category: question.category
      }
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      analyzeResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const analyzeResults = async () => {
    setAnalyzing(true);
    
    // Calculate scores by category
    const categoryScores = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0,
      leadership: 0
    };

    Object.values(answers).forEach(answer => {
      categoryScores[answer.category] += answer.score;
    });

    // Normalize scores to 0-100
    const maxScorePerCategory = 10; // 2 questions per category * max 5 points
    const normalizedScores = {};
    Object.keys(categoryScores).forEach(key => {
      normalizedScores[key] = Math.round((categoryScores[key] / maxScorePerCategory) * 100);
    });

    // Get AI analysis
    try {
      const aiAnalysis = await base44.integrations.Core.InvokeLLM({
        prompt: `Based on these career aptitude quiz scores, provide career recommendations:
          - Analytical: ${normalizedScores.analytical}%
          - Creative: ${normalizedScores.creative}%
          - Social: ${normalizedScores.social}%
          - Practical: ${normalizedScores.practical}%
          - Leadership: ${normalizedScores.leadership}%
          
          Provide 5 career recommendations with confidence scores (0-100) based on how well they match the profile.
          Consider the person's strengths and provide actionable insights.`,
        response_json_schema: {
          type: "object",
          properties: {
            overall_analysis: { type: "string" },
            top_strengths: { 
              type: "array", 
              items: { type: "string" } 
            },
            career_recommendations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  career: { type: "string" },
                  confidence_score: { type: "number" },
                  explanation: { type: "string" },
                  skills_needed: { 
                    type: "array", 
                    items: { type: "string" } 
                  }
                }
              }
            },
            personality_traits: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setResults({
        scores: normalizedScores,
        aiAnalysis
      });

      // Save results if user is logged in
      if (user?.email) {
        await base44.entities.QuizResult.create({
          user_email: user.email,
          quiz_type: "aptitude",
          answers: Object.values(answers),
          total_score: Object.values(normalizedScores).reduce((a, b) => a + b, 0) / 5,
          ai_analysis: aiAnalysis.overall_analysis,
          career_recommendations: aiAnalysis.career_recommendations,
          personality_traits: aiAnalysis.personality_traits
        });

        // Update student profile
        const existingProfile = await base44.entities.StudentProfile.filter({ user_email: user.email });
        if (existingProfile.length > 0) {
          await base44.entities.StudentProfile.update(existingProfile[0].id, {
            quiz_scores: normalizedScores,
            predicted_careers: aiAnalysis.career_recommendations.map(c => ({
              career: c.career,
              confidence: c.confidence_score,
              match_reasons: c.skills_needed
            })),
            personality_type: aiAnalysis.personality_traits[0]
          });
        } else {
          await base44.entities.StudentProfile.create({
            user_email: user.email,
            name: user.full_name,
            quiz_scores: normalizedScores,
            predicted_careers: aiAnalysis.career_recommendations.map(c => ({
              career: c.career,
              confidence: c.confidence_score,
              match_reasons: c.skills_needed
            })),
            personality_type: aiAnalysis.personality_traits[0]
          });
        }
      }

      setQuizComplete(true);
    } catch (error) {
      console.error('Error analyzing results:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
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
            <Brain className="w-full h-full text-violet-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Results</h2>
          <p className="text-gray-400">Our AI is processing your responses...</p>
          <div className="mt-6 flex justify-center gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                className="w-3 h-3 rounded-full bg-violet-500"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (quizComplete && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className="text-gray-400">Here's your personalized career analysis</p>
          </motion.div>

          {/* Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-violet-400" />
                  Your Skill Profile
                </h2>
                <div className="grid md:grid-cols-5 gap-4">
                  {Object.entries(results.scores).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#334155"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 251" }}
                            animate={{ strokeDasharray: `${(value / 100) * 251} 251` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{value}%</span>
                        </div>
                      </div>
                      <p className="text-gray-300 capitalize text-sm">{key}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  AI Analysis
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">{results.aiAnalysis.overall_analysis}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-gray-400 text-sm">Top Strengths:</span>
                  {results.aiAnalysis.top_strengths?.map((strength, i) => (
                    <span key={i} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                      {strength}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-gray-400 text-sm">Personality:</span>
                  {results.aiAnalysis.personality_traits?.map((trait, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                      {trait}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Career Recommendations
                </h2>
                <div className="space-y-4">
                  {results.aiAnalysis.career_recommendations?.map((career, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">{career.career}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          career.confidence_score >= 80 ? 'bg-emerald-500/20 text-emerald-400' :
                          career.confidence_score >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {career.confidence_score}% Match
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{career.explanation}</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills_needed?.map((skill, j) => (
                          <span key={j} className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <Link to={createPageUrl('Dashboard')}>
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 px-8">
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-gray-50 via-white to-gray-100 p-4 md:p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Career Aptitude Quiz</h1>
          <p className="text-gray-400">Discover your strengths and ideal career paths</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-slate-700" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm capitalize">
                    {currentQ.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 text-gray-400 rounded-full text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~30 sec
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                  {currentQ.question}
                </h2>

                <RadioGroup
                  value={answers[currentQ.id]?.answer || ""}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {currentQ.options.map((option) => (
                    <div key={option.value}>
                      <Label
                        htmlFor={`${currentQ.id}-${option.value}`}
                        className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                          answers[currentQ.id]?.answer === option.value
                            ? 'bg-violet-500/20 border-violet-500/50 text-white'
                            : 'bg-slate-900/50 border-slate-700/50 text-gray-300 hover:border-slate-600'
                        }`}
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={`${currentQ.id}-${option.value}`}
                          className="border-slate-500"
                        />
                        <span className="ml-3">{option.text}</span>
                        {answers[currentQ.id]?.answer === option.value && (
                          <CheckCircle2 className="ml-auto w-5 h-5 text-violet-400" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border-slate-700 text-gray-300 hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                Complete Quiz
                <Sparkles className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}