import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Star, 
  Clock, 
  Award,
  MessageSquare,
  Video,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Brain,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const counselors = [
  {
    name: "Dr. Priya Sharma",
    title: "Senior Career Psychologist",
    specialization: "Career Transition & Leadership",
    experience: "15+ years",
    rating: 4.9,
    reviews: 342,
    sessions: 1200,
    avatar: "PS",
    color: "from-violet-500 to-purple-600",
    expertise: ["Career Assessment", "Executive Coaching", "Work-Life Balance"],
    education: "PhD Psychology, IIT Delhi",
    location: "India",
    available: true
  },
  {
    name: "Dr. Rajesh Kumar",
    title: "Educational Counselor",
    specialization: "Higher Education & Admissions",
    experience: "12+ years",
    rating: 4.8,
    reviews: 287,
    sessions: 950,
    avatar: "RK",
    color: "from-blue-500 to-cyan-600",
    expertise: ["College Admissions", "Study Abroad", "Scholarship Guidance"],
    education: "EdD, Stanford University",
    location: "USA",
    available: true
  },
  {
    name: "Ms. Ananya Verma",
    title: "Youth Career Counselor",
    specialization: "Student Guidance & Mentoring",
    experience: "8+ years",
    rating: 4.9,
    reviews: 198,
    sessions: 650,
    avatar: "AV",
    color: "from-pink-500 to-rose-600",
    expertise: ["Teen Counseling", "Aptitude Testing", "Peer Pressure"],
    education: "MA Counseling Psychology, JNU",
    location: "India",
    available: false
  },
  {
    name: "Dr. Sanjay Patel",
    title: "Industry Expert & Mentor",
    specialization: "Tech & Engineering Careers",
    experience: "20+ years",
    rating: 4.7,
    reviews: 412,
    sessions: 1500,
    avatar: "SP",
    color: "from-emerald-500 to-teal-600",
    expertise: ["Tech Careers", "Startup Guidance", "Industry Networking"],
    education: "PhD Computer Science, IISc",
    location: "Singapore",
    available: true
  },
  {
    name: "Dr. Meera Reddy",
    title: "Clinical Psychologist",
    specialization: "Career Anxiety & Stress Management",
    experience: "10+ years",
    rating: 4.9,
    reviews: 256,
    sessions: 820,
    avatar: "MR",
    color: "from-amber-500 to-orange-600",
    expertise: ["Stress Management", "Decision Making", "Confidence Building"],
    education: "PhD Clinical Psychology, NIMHANS",
    location: "India",
    available: true
  },
  {
    name: "Mr. Arjun Nair",
    title: "Corporate HR Consultant",
    specialization: "Resume & Interview Preparation",
    experience: "14+ years",
    rating: 4.8,
    reviews: 378,
    sessions: 1100,
    avatar: "AN",
    color: "from-indigo-500 to-violet-600",
    expertise: ["Resume Building", "Interview Skills", "Salary Negotiation"],
    education: "MBA HR, IIM Ahmedabad",
    location: "UAE",
    available: true
  },
  {
    name: "Dr. Emily Thompson",
    title: "International Career Advisor",
    specialization: "Global Career Opportunities",
    experience: "18+ years",
    rating: 4.9,
    reviews: 521,
    sessions: 1850,
    avatar: "ET",
    color: "from-cyan-500 to-blue-600",
    expertise: ["International Jobs", "Visa Guidance", "Relocation Support"],
    education: "PhD Career Development, Oxford",
    location: "UK",
    available: true
  },
  {
    name: "Prof. David Chen",
    title: "Academic & Research Counselor",
    specialization: "PhD & Research Careers",
    experience: "22+ years",
    rating: 4.8,
    reviews: 389,
    sessions: 1340,
    avatar: "DC",
    color: "from-purple-500 to-indigo-600",
    expertise: ["Research Careers", "PhD Admissions", "Academic Publishing"],
    education: "PhD Engineering, MIT",
    location: "USA",
    available: true
  },
  {
    name: "Ms. Sophie Laurent",
    title: "Creative Industries Specialist",
    specialization: "Arts & Media Careers",
    experience: "11+ years",
    rating: 4.7,
    reviews: 267,
    sessions: 780,
    avatar: "SL",
    color: "from-rose-500 to-pink-600",
    expertise: ["Creative Careers", "Portfolio Building", "Freelancing"],
    education: "MA Fine Arts, Sorbonne",
    location: "France",
    available: true
  },
  {
    name: "Dr. Yuki Tanaka",
    title: "Technology Career Coach",
    specialization: "Software & AI Careers",
    experience: "16+ years",
    rating: 4.9,
    reviews: 445,
    sessions: 1620,
    avatar: "YT",
    color: "from-teal-500 to-emerald-600",
    expertise: ["Tech Careers", "AI/ML Roles", "Coding Bootcamps"],
    education: "PhD Computer Science, Tokyo Tech",
    location: "Japan",
    available: true
  },
  {
    name: "Mr. Carlos Rodriguez",
    title: "Business & Entrepreneurship Mentor",
    specialization: "Startups & Business Strategy",
    experience: "19+ years",
    rating: 4.8,
    reviews: 398,
    sessions: 1290,
    avatar: "CR",
    color: "from-orange-500 to-red-600",
    expertise: ["Entrepreneurship", "Business Strategy", "Startup Funding"],
    education: "MBA Entrepreneurship, INSEAD",
    location: "Spain",
    available: true
  },
  {
    name: "Dr. Amara Okafor",
    title: "Healthcare Career Advisor",
    specialization: "Medical & Healthcare Fields",
    experience: "13+ years",
    rating: 4.9,
    reviews: 312,
    sessions: 940,
    avatar: "AO",
    color: "from-green-500 to-teal-600",
    expertise: ["Medical Careers", "Healthcare Management", "Nursing Paths"],
    education: "MD, University of Cape Town",
    location: "South Africa",
    available: true
  }
];

export default function Counselors() {
  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-950 from-emerald-50 via-white to-gray-50 p-4 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Global Career Counselors</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with certified career counselors and psychologists from across the globe for personalized, in-depth guidance
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: "Expert Counselors", value: "50+", icon: Users },
            { label: "Sessions Completed", value: "0", icon: Video },
            { label: "Average Rating", value: "4.8", icon: Star },
            { label: "Success Rate", value: "96%", icon: Award }
          ].map((stat, i) => (
            <Card key={i} className="bg-slate-800/30 border-slate-700/50 backdrop-blur">
              <CardContent className="p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Counselors Grid */}
        {/* Filter Section */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20">
            All Countries
          </Button>
          <Button variant="outline" className="border-slate-700 text-gray-400 hover:bg-slate-800">
            India
          </Button>
          <Button variant="outline" className="border-slate-700 text-gray-400 hover:bg-slate-800">
            USA
          </Button>
          <Button variant="outline" className="border-slate-700 text-gray-400 hover:bg-slate-800">
            UK
          </Button>
          <Button variant="outline" className="border-slate-700 text-gray-400 hover:bg-slate-800">
            Europe
          </Button>
          <Button variant="outline" className="border-slate-700 text-gray-400 hover:bg-slate-800">
            Asia
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors.map((counselor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur h-full hover:border-emerald-500/30 transition-all">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${counselor.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-xl font-bold text-white">{counselor.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white truncate">{counselor.name}</h3>
                        {counselor.available ? (
                          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full flex-shrink-0" />
                        ) : (
                          <span className="w-2.5 h-2.5 bg-gray-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-violet-400">{counselor.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{counselor.specialization}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{counselor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-medium">{counselor.rating}</span>
                      <span className="text-gray-500">({counselor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {counselor.experience}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                    <GraduationCap className="w-4 h-4" />
                    {counselor.education}
                  </div>

                  {/* Expertise */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {counselor.expertise.map((exp, j) => (
                      <Badge key={j} variant="secondary" className="bg-slate-700/50 text-gray-300 text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>

                  {/* Sessions Count */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-gray-400 text-sm">Sessions Completed</span>
                    <span className="text-white font-semibold">{counselor.sessions}+</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      className={`flex-1 ${counselor.available 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500' 
                        : 'bg-slate-700 text-gray-400 cursor-not-allowed'}`}
                      disabled={!counselor.available}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {counselor.available ? 'Book Session' : 'Unavailable'}
                    </Button>
                    <Button variant="outline" size="icon" className="border-slate-700 hover:bg-slate-800">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20 backdrop-blur">
            <CardContent className="p-8">
              <Brain className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Not sure which counselor to choose?</h2>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Let our AI match you with the perfect counselor based on your needs and preferences
              </p>
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-8">
                Get Matched by AI
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}