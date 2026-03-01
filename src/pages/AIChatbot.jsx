import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User,
  Sparkles,
  Loader2,
  Trash2,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AIChatbot() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm Cluster AI, your career counseling assistant. I can help you with:\n\n• Career guidance and recommendations\n• Education pathways and college advice\n• Skill development suggestions\n• Interview preparation tips\n• Industry insights and trends\n\nWhat would you like to know about your career journey?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {}
    };
    loadUser();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Get student profile for context if available
      let profileContext = '';
      if (user?.email) {
        const profiles = await base44.entities.StudentProfile.filter({ user_email: user.email });
        if (profiles.length > 0) {
          const profile = profiles[0];
          profileContext = `
            Student Profile Context:
            - Name: ${profile.name}
            - Education Level: ${profile.education_level || 'Not specified'}
            - Interests: ${profile.interests?.join(', ') || 'Not specified'}
            - Skills: ${profile.skills?.join(', ') || 'Not specified'}
            - Personality Type: ${profile.personality_type || 'Not specified'}
            - Career Goals: ${profile.career_goals || 'Not specified'}
          `;
        }
      }

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Cluster AI, an expert career counselor chatbot. You provide helpful, encouraging, and professional career advice.

${profileContext}

Previous conversation context:
${messages.slice(-6).map(m => `${m.role}: ${m.content}`).join('\n')}

User's question: ${userMessage}

Provide a helpful, detailed response about career guidance. Be supportive and practical. If the question is off-topic, gently redirect to career-related topics.`,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            suggested_follow_ups: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      const aiMessage = response.response;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiMessage,
        suggestions: response.suggested_follow_ups
      }]);

      // Save to database if logged in
      if (user?.email) {
        await base44.entities.ChatMessage.create({
          user_email: user.email,
          role: 'user',
          content: userMessage,
          session_id: sessionId
        });
        await base44.entities.ChatMessage.create({
          user_email: user.email,
          role: 'assistant',
          content: aiMessage,
          session_id: sessionId
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I encountered an error. Please try asking your question again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Chat cleared! How can I help you with your career journey?"
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950 from-blue-50 via-white to-gray-50 p-4 md:p-8 transition-colors">
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Cluster AI Assistant</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-gray-400 text-sm">Online</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="text-gray-400 hover:text-white hover:bg-slate-800"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Chat Container */}
        <Card className="flex-1 bg-slate-800/30 border-slate-700/50 backdrop-blur overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                      <div className={`p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-br-sm'
                          : 'bg-slate-700/50 text-gray-200 rounded-bl-sm'
                      }`}>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.slice(0, 3).map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 text-xs rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                          className="w-2 h-2 bg-blue-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about careers, education, skills..."
                className="flex-1 bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-6"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              <Sparkles className="inline w-3 h-3 mr-1" />
              Powered by Cluster AI · Career counseling at your fingertips
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}