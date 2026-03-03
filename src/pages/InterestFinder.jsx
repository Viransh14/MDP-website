import React, { useState, useEffect } from 'react';
import { base44 } from '../api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2,
  Loader2,
  Palette,
  BookOpen,
  Users,
  Lightbulb,
  Music,
  Code,
  Camera,
  Briefcase
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Slider } from '../components/ui/slider';

const personalityQuestions = [
  {
    id: 1,
    question: "I enjoy spending time with large groups of people",
    category: "extraversion"
  },
  {
    id: 2,
    question: "I prefer having a set routine over spontaneous activities",
    category: "structure"
  },
  {
    id: 3,
    question: "I often come up with creative or unconventional ideas",
    category: "creativity"
  },
  {
    id: 4,
    question: "I find it easy to understand others' emotions and perspectives",
    category: "empathy"
  },
  {
    id: 5,
    question: "I enjoy solving complex puzzles or logical problems",
    category: "analytical"
  },
  {
    id: 6,
    question: "I prefer working independently rather than in teams",
    category: "independence"
  },
  {
    id: 7,
    question: "I get excited about learning new technologies or tools",
    category: "tech_interest"
  },
  {
    id: 8,
    question: "I enjoy expressing myself through art, writing, or music",
    category: "artistic"
  },
  {
    id: 9,
    question: "I naturally take charge in group situations",
    category: "leadership"
  },
  {
    id: 10,
    question: "I prefer practical, hands-on work over theoretical discussions",
    category: "practical"
  },
  {
    id: 11,
    question: "I enjoy helping others solve their problems",
    category: "helping"
  },
  {
    id: 12,
    question: "I'm detail-oriented and pay attention to small things",
    category: "detail"
  },
  {
    id: 13,
    question: "I enjoy persuading or negotiating with others",
    category: "persuasion"
  },
  {
    id: 14,
    question: "I'm curious about how things work and like to investigate",
    category: "curiosity"
  },
  {
    id: 15,
    question: "I value financial stability and career growth",
    category: "ambition"
  }
];

export default function InterestFinder() {
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
        // Not logged in
      }
    };
    loadUser();
  }, []);

  const handleAnswer = (value) => {
    const question = personalityQuestions[currentQuestion];
    const answerValue = Array.isArray(value) ? value[0] : value;
    setAnswers(prev => ({
      ...prev,
      [question.id]: {
        question_id: question.id,
        answer: answerValue,
        category: question.category
      }
    }));
  };

  // Set default answer for each question when it loads
  useEffect(() => {
    const currentQ = personalityQuestions[currentQuestion];
    if (!answers[currentQ.id]) {
      handleAnswer([3]); // Default to neutral (3)
    }
  }, [currentQuestion]);

  const nextQuestion = async () => {
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      await analyzePersonality();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
const analyzePersonality = async () => {
  setAnalyzing(true);

  try {
    const personalityProfile = {};
    Object.values(answers).forEach(answer => {
      personalityProfile[answer.category] = answer.answer;
    });

    console.log("Profile:", personalityProfile);

    const aiAnalysis = await base44.integrations.Core.InvokeLLM({
      prompt: `Analyze this personality profile:
      ${JSON.stringify(personalityProfile, null, 2)}

      Return JSON with:
      personality_summary,
      personality_type,
      primary_interests,
      recommended_activities,
      career_fields,
      strengths,
      growth_areas`
    });

    console.log("AI:", aiAnalysis);

    if (!aiAnalysis) {
      throw new Error("No AI response");
    }

    setResults(aiAnalysis);
    setQuizComplete(true);

  } catch (error) {
    console.error("AI Error:", error);
    alert("Error analyzing personality");
  } finally {
    setAnalyzing(false);
  }
};
 const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100;

  const interestIcons = {
    "Technology": Code,
    "Arts": Palette,
    "Business": Briefcase,
    "Education": BookOpen,
    "Social Work": Users,
    "Science": Lightbulb,
    "Music": Music,
    "Media": Camera
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-950/20 to-slate-950 flex items-center justify-center p-4">
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
            <Heart className="w-full h-full text-pink-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Discovering Your Interests</h2>
          <p className="text-gray-400">AI is analyzing your personality...</p>
        </motion.div>
      </div>
    );
  }

  if (quizComplete && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-950/20 to-slate-950 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Interest Profile</h1>
            <p className="text-gray-400">{results.personality_type}</p>
          </motion.div>

          {/* Personality Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  Personality Analysis
                </h2>
                <p className="text-gray-300 leading-relaxed">{results.personality_summary}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Your Strengths</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.strengths?.map((strength, i) => (
                        <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Growth Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.growth_areas?.map((area, i) => (
                        <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Primary Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  Your Primary Interests
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.primary_interests?.map((interest, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">{interest.interest}</h3>
                        <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-bold">
                          {interest.match_percentage}%
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{interest.description}</p>
                      <Progress value={interest.match_percentage} className="h-1.5 mt-3 bg-slate-700" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommended Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Activities You'd Enjoy</h2>
                <div className="flex flex-wrap gap-2">
                  {results.recommended_activities?.map((activity, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 text-white rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Career Fields */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                  Recommended Career Fields
                </h2>
                <div className="space-y-4">
                  {results.career_fields?.map((field, i) => (
                    <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <h3 className="text-lg font-semibold text-white mb-2">{field.field}</h3>
                      <p className="text-gray-400 text-sm mb-3">{field.reason}</p>
                      <div className="flex flex-wrap gap-2">
                        {field.careers?.map((career, j) => (
                          <span key={j} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <Link to={createPageUrl('Dashboard')}>
              <Button className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 px-8">
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = personalityQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-pink-950/20 dark:to-slate-950 from-pink-50 via-white to-gray-50 p-4 md:p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Interest Finder</h1>
          <p className="text-gray-400">Rate each statement based on how much you agree</p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {personalityQuestions.length}</span>
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
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 text-center">
                  "{currentQ.question}"
                </h2>

                <div className="space-y-6">
                  <Slider
                    value={[answers[currentQ.id]?.answer || 3]}
                    onValueChange={handleAnswer}
                    min={1}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-pink-400">Strongly Disagree</span>
                    <span className="text-emerald-400">Strongly Agree</span>
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => handleAnswer([num])}
                        className={`w-12 h-12 rounded-full border-2 transition-all font-bold ${
                          answers[currentQ.id]?.answer === num
                            ? 'bg-pink-500 border-pink-500 text-white scale-110'
                            : 'border-slate-600 text-gray-400 hover:border-pink-500/50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
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
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500"
          >
            {currentQuestion === personalityQuestions.length - 1 ? (
              <>
                Discover Interests
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