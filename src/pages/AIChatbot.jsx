import React, { useState, useEffect, useRef } from 'react';
import { invokeLLM } from '../api/ChatClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';

export default function AIChatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm Cluster AI, your career counseling assistant.\n\nHow can I guide you in your career journey today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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
      const prompt = `
You are Cluster AI, an expert and supportive career counselor.

Previous conversation:
${messages.slice(-6).map(m => `${m.role}: ${m.content}`).join('\n')}

User: ${userMessage}

Provide helpful, practical, and encouraging career guidance.
`;

      const response = await invokeLLM(prompt);

      const aiMessage = response.reply;
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: aiMessage }
      ]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I encountered an error. Please try again."
        }
      ]);
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

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared! How can I help you next?"
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Cluster AI Assistant
              </h1>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Chat Container */}
        <Card className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <Bot className="w-6 h-6 text-blue-500" />
                    )}

                    <div
                      className={`p-3 rounded-xl max-w-[75%] ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </p>
                    </div>

                    {message.role === 'user' && (
                      <User className="w-6 h-6 text-purple-500" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="flex gap-3 items-center">
                  <Bot className="w-6 h-6 text-blue-500" />
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about careers, education, skills..."
              disabled={isTyping}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500 pb-2">
            <Sparkles className="inline w-3 h-3 mr-1" />
            Powered by Cluster AI
          </p>
        </Card>
      </div>
    </div>
  );
}