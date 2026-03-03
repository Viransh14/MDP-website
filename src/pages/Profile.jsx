import React, { useState, useEffect } from 'react';
import { base44 } from '../api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  BookOpen, 
  Target,
  Award,
  Edit2,
  Save,
  X,
  Camera,
  Sparkles,
  CheckCircle2,
  Brain
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        base44.auth.redirectToLogin();
      }
    };
    loadUser();
  }, []);

  const { data: profiles } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => base44.entities.StudentProfile.filter({ user_email: user?.email }),
    enabled: !!user?.email
  });

  const profile = profiles?.[0];

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        age: profile.age || '',
        education_level: profile.education_level || '',
        current_field: profile.current_field || '',
        skills: profile.skills?.join(', ') || '',
        interests: profile.interests?.join(', ') || '',
        career_goals: profile.career_goals || ''
      });
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const updateData = {
        ...data,
        skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: data.interests.split(',').map(s => s.trim()).filter(Boolean)
      };
      
      if (profile) {
        return base44.entities.StudentProfile.update(profile.id, updateData);
      } else {
        return base44.entities.StudentProfile.create({
          ...updateData,
          user_email: user.email
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      setEditing(false);
    }
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 from-gray-50 via-white to-gray-100 p-4 md:p-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your career profile and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-white">
                      {getInitials(user.full_name)}
                    </span>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{user.full_name}</h2>
                      <div className="flex items-center gap-2 text-gray-400 mt-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </div>
                    <Button
                      onClick={() => setEditing(!editing)}
                      variant={editing ? "ghost" : "outline"}
                      className={editing ? "text-gray-400" : "border-slate-700 text-gray-300"}
                    >
                      {editing ? <X className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                      {editing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>

                  {/* Personality Badge */}
                  {profile?.personality_type && (
                    <Badge className="bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 border border-violet-500/30 mb-4">
                      <Brain className="w-3 h-3 mr-1" />
                      {profile.personality_type}
                    </Badge>
                  )}

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-slate-900/50 rounded-xl">
                      <p className="text-2xl font-bold text-violet-400">{profile?.predicted_careers?.length || 0}</p>
                      <p className="text-xs text-gray-500">Career Matches</p>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-xl">
                      <p className="text-2xl font-bold text-cyan-400">{profile?.skills?.length || 0}</p>
                      <p className="text-xs text-gray-500">Skills</p>
                    </div>
                    <div className="text-center p-3 bg-slate-900/50 rounded-xl">
                      <p className="text-2xl font-bold text-pink-400">{profile?.interests?.length || 0}</p>
                      <p className="text-xs text-gray-500">Interests</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Editable Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-violet-400" />
                Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Full Name</Label>
                  {editing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-900/50 border-slate-700 text-white"
                    />
                  ) : (
                    <p className="text-white p-2 bg-slate-900/30 rounded-lg">{profile?.name || user.full_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Age</Label>
                  {editing ? (
                    <Input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      className="bg-slate-900/50 border-slate-700 text-white"
                    />
                  ) : (
                    <p className="text-white p-2 bg-slate-900/30 rounded-lg">{profile?.age || 'Not specified'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Education Level</Label>
                  {editing ? (
                    <Select
                      value={formData.education_level}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, education_level: value }))}
                    >
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high_school">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-white p-2 bg-slate-900/30 rounded-lg capitalize">
                      {profile?.education_level?.replace('_', ' ') || 'Not specified'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Current Field / Major</Label>
                  {editing ? (
                    <Input
                      value={formData.current_field}
                      onChange={(e) => setFormData(prev => ({ ...prev, current_field: e.target.value }))}
                      className="bg-slate-900/50 border-slate-700 text-white"
                    />
                  ) : (
                    <p className="text-white p-2 bg-slate-900/30 rounded-lg">{profile?.current_field || 'Not specified'}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Skills (comma separated)</Label>
                {editing ? (
                  <Input
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills?.length > 0 ? (
                      profile.skills.map((skill, i) => (
                        <Badge key={i} className="bg-violet-500/20 text-violet-300">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Interests (comma separated)</Label>
                {editing ? (
                  <Input
                    value={formData.interests}
                    onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile?.interests?.length > 0 ? (
                      profile.interests.map((interest, i) => (
                        <Badge key={i} className="bg-pink-500/20 text-pink-300">
                          {interest}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500">No interests added</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Career Goals</Label>
                {editing ? (
                  <Textarea
                    value={formData.career_goals}
                    onChange={(e) => setFormData(prev => ({ ...prev, career_goals: e.target.value }))}
                    className="bg-slate-900/50 border-slate-700 text-white min-h-[100px]"
                  />
                ) : (
                  <p className="text-white p-2 bg-slate-900/30 rounded-lg">
                    {profile?.career_goals || 'Not specified'}
                  </p>
                )}
              </div>

              {editing && (
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Predictions */}
        {profile?.predicted_careers?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Career Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.predicted_careers.slice(0, 5).map((career, i) => (
                    <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-medium">{career.career}</h4>
                        <Badge className={`${
                          career.confidence >= 80 ? 'bg-emerald-500/20 text-emerald-400' :
                          career.confidence >= 60 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {career.confidence}% Match
                        </Badge>
                      </div>
                      {career.match_reasons && (
                        <div className="flex flex-wrap gap-1">
                          {career.match_reasons.slice(0, 3).map((reason, j) => (
                            <span key={j} className="text-xs px-2 py-0.5 bg-slate-700/50 text-gray-400 rounded">
                              {reason}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}