import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  MapPin, 
  DollarSign,
  Award,
  Users,
  BookOpen,
  Building,
  Star,
  ChevronRight,
  Sparkles,
  Loader2,
  Filter,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function CollegeAdvisor() {
  const [user, setUser] = useState(null);
  const [searchParams, setSearchParams] = useState({
    career_interest: '',
    preferred_location: '',
    budget: '',
    education_level: ''
  });
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {}
    };
    loadUser();
  }, []);

  const searchColleges = async () => {
    setSearching(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `As an expert college advisor, recommend colleges/universities for a student with these preferences:

        Career Interest: ${searchParams.career_interest || 'Not specified'}
        Preferred Location: ${searchParams.preferred_location || 'Any'}
        Budget: ${searchParams.budget || 'Any'}
        Education Level: ${searchParams.education_level || 'Undergraduate'}

        Provide detailed recommendations for colleges in India and abroad that match these criteria.
        Include admission requirements, estimated costs, and why each college is a good fit.`,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            recommended_colleges: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  location: { type: "string" },
                  type: { type: "string" },
                  ranking: { type: "string" },
                  programs: { type: "array", items: { type: "string" } },
                  annual_fee: { type: "string" },
                  admission_requirements: { type: "array", items: { type: "string" } },
                  match_score: { type: "number" },
                  why_recommended: { type: "string" },
                  website: { type: "string" }
                }
              }
            },
            application_tips: { type: "array", items: { type: "string" } },
            scholarship_opportunities: { type: "array", items: { type: "string" } },
            timeline: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  month: { type: "string" },
                  task: { type: "string" }
                }
              }
            }
          }
        }
      });

      setResults(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-amber-950/20 dark:to-slate-950 from-amber-50 via-white to-gray-50 p-4 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">College Advisor</h1>
          <p className="text-gray-400">Find the perfect college that aligns with your career goals</p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-400" />
                Find Your Ideal College
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Career Interest / Field of Study</Label>
                  <Input
                    value={searchParams.career_interest}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, career_interest: e.target.value }))}
                    placeholder="e.g., Computer Science, Medicine, Business"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Preferred Location</Label>
                  <Select
                    value={searchParams.preferred_location}
                    onValueChange={(value) => setSearchParams(prev => ({ ...prev, preferred_location: value }))}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select location preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="any">Any Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Budget Range (Annual)</Label>
                  <Select
                    value={searchParams.budget}
                    onValueChange={(value) => setSearchParams(prev => ({ ...prev, budget: value }))}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Under ₹5 Lakhs</SelectItem>
                      <SelectItem value="medium">₹5-15 Lakhs</SelectItem>
                      <SelectItem value="high">₹15-30 Lakhs</SelectItem>
                      <SelectItem value="premium">Above ₹30 Lakhs</SelectItem>
                      <SelectItem value="any">Any Budget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Education Level</Label>
                  <Select
                    value={searchParams.education_level}
                    onValueChange={(value) => setSearchParams(prev => ({ ...prev, education_level: value }))}
                  >
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate (Bachelor's)</SelectItem>
                      <SelectItem value="graduate">Graduate (Master's)</SelectItem>
                      <SelectItem value="doctoral">Doctoral (PhD)</SelectItem>
                      <SelectItem value="diploma">Diploma / Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={searchColleges}
                disabled={searching || !searchParams.career_interest}
                className="w-full mt-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
              >
                {searching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching Colleges...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Find Colleges
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        {results && (
          <>
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-2">AI Recommendations</h2>
                      <p className="text-gray-300 leading-relaxed">{results.summary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Colleges Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {results.recommended_colleges?.map((college, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full hover:border-amber-500/30 transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{college.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4" />
                            {college.location}
                          </div>
                        </div>
                        <Badge className={`${
                          college.match_score >= 80 ? 'bg-emerald-500/20 text-emerald-400' :
                          college.match_score >= 60 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {college.match_score}% Match
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span className="text-gray-300">{college.ranking}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-emerald-400" />
                          <span className="text-gray-300">{college.annual_fee}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">{college.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-violet-400" />
                          <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                            Website
                          </a>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm mb-4">{college.why_recommended}</p>

                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Popular Programs:</p>
                        <div className="flex flex-wrap gap-1">
                          {college.programs?.slice(0, 4).map((program, j) => (
                            <Badge key={j} variant="secondary" className="bg-slate-700/50 text-gray-300 text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-2">Admission Requirements:</p>
                        <ul className="space-y-1">
                          {college.admission_requirements?.slice(0, 3).map((req, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                              <ChevronRight className="w-3 h-3 mt-0.5 text-amber-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Application Tips & Scholarships */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      Application Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.application_tips?.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-400" />
                      Scholarship Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.scholarship_opportunities?.map((scholarship, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                          <Star className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                          {scholarship}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Timeline */}
            {results.timeline && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-violet-400" />
                      Application Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {results.timeline?.map((item, i) => (
                        <div key={i} className="flex-1 min-w-[200px] p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <p className="text-violet-400 font-semibold mb-1">{item.month}</p>
                          <p className="text-gray-300 text-sm">{item.task}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}