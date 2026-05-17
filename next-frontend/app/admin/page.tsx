"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Shield, Eye, Mail, BarChart2, Loader, LogIn,
  AlertTriangle, Inbox, Trash2, TrendingUp, Users, Clock,
  CheckCircle, Filter, Search, RefreshCw,
  MessageSquare, Calendar, ArrowUpRight, ChevronDown, ChevronUp,
  EyeOff, Key, XCircle, Star, Award, Command, Activity, Zap
} from 'lucide-react';
import { DotGlobeHero } from '@/components/ui/globe-hero';

interface Stats {
  totalVisits: number;
  totalMessages: number;
  new?: number;
  byStatus?: Record<string, number>;
}

interface Message {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
}

// ✅ Fixed Animated Logout Button Component
const LogoutButton = ({ onClick }: { onClick: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [animationState, setAnimationState] = useState<string>('default');

  const animationStates = {
    default: {
      '--figure-duration': '100',
      '--transform-figure': 'none',
      '--walking-duration': '100',
      '--transform-arm1': 'none',
      '--transform-wrist1': 'none',
      '--transform-arm2': 'none',
      '--transform-wrist2': 'none',
      '--transform-leg1': 'none',
      '--transform-calf1': 'none',
      '--transform-leg2': 'none',
      '--transform-calf2': 'none'
    },
    hover: {
      '--figure-duration': '100',
      '--transform-figure': 'translateX(1.5px)',
      '--walking-duration': '100',
      '--transform-arm1': 'rotate(-5deg)',
      '--transform-wrist1': 'rotate(-15deg)',
      '--transform-arm2': 'rotate(5deg)',
      '--transform-wrist2': 'rotate(6deg)',
      '--transform-leg1': 'rotate(-10deg)',
      '--transform-calf1': 'rotate(5deg)',
      '--transform-leg2': 'rotate(20deg)',
      '--transform-calf2': 'rotate(-20deg)'
    },
    walking1: {
      '--figure-duration': '300',
      '--transform-figure': 'translateX(11px)',
      '--walking-duration': '300',
      '--transform-arm1': 'translateX(-4px) translateY(-2px) rotate(120deg)',
      '--transform-wrist1': 'rotate(-5deg)',
      '--transform-arm2': 'translateX(4px) rotate(-110deg)',
      '--transform-wrist2': 'rotate(-5deg)',
      '--transform-leg1': 'translateX(-3px) rotate(80deg)',
      '--transform-calf1': 'rotate(-30deg)',
      '--transform-leg2': 'translateX(4px) rotate(-60deg)',
      '--transform-calf2': 'rotate(20deg)'
    },
    walking2: {
      '--figure-duration': '400',
      '--transform-figure': 'translateX(17px)',
      '--walking-duration': '300',
      '--transform-arm1': 'rotate(60deg)',
      '--transform-wrist1': 'rotate(-15deg)',
      '--transform-arm2': 'rotate(-45deg)',
      '--transform-wrist2': 'rotate(6deg)',
      '--transform-leg1': 'rotate(-5deg)',
      '--transform-calf1': 'rotate(10deg)',
      '--transform-leg2': 'rotate(10deg)',
      '--transform-calf2': 'rotate(-20deg)'
    },
    falling1: {
      '--figure-duration': '1600',
      '--walking-duration': '400',
      '--transform-arm1': 'rotate(-60deg)',
      '--transform-wrist1': 'none',
      '--transform-arm2': 'rotate(30deg)',
      '--transform-wrist2': 'rotate(120deg)',
      '--transform-leg1': 'rotate(-30deg)',
      '--transform-calf1': 'rotate(-20deg)',
      '--transform-leg2': 'rotate(20deg)',
      '--transform-calf2': 'none'
    },
    falling2: {
      '--walking-duration': '300',
      '--transform-arm1': 'rotate(-100deg)',
      '--transform-arm2': 'rotate(-60deg)',
      '--transform-wrist2': 'rotate(60deg)',
      '--transform-leg1': 'rotate(80deg)',
      '--transform-calf1': 'rotate(20deg)',
      '--transform-leg2': 'rotate(-60deg)',
      '--transform-calf2': 'none'
    },
    falling3: {
      '--walking-duration': '500',
      '--transform-arm1': 'rotate(-30deg)',
      '--transform-wrist1': 'rotate(40deg)',
      '--transform-arm2': 'rotate(50deg)',
      '--transform-wrist2': 'none',
      '--transform-leg1': 'rotate(-30deg)',
      '--transform-leg2': 'rotate(20deg)',
      '--transform-calf2': 'none'
    }
  };

  const handleMouseEnter = () => {
    if (animationState === 'default') {
      setAnimationState('hover');
    }
  };

  const handleMouseLeave = () => {
    if (animationState === 'hover') {
      setAnimationState('default');
    }
  };

  const handleClick = () => {
    if (animationState === 'default' || animationState === 'hover') {
      const btn = buttonRef.current;
      if (!btn) return;

      btn.classList.add("clicked");
      setAnimationState('walking1');

      setTimeout(() => {
        btn.classList.add("door-slammed");
        setAnimationState('walking2');

        setTimeout(() => {
          btn.classList.add("falling");
          setAnimationState('falling1');

          setTimeout(() => {
            setAnimationState('falling2');

            setTimeout(() => {
              setAnimationState('falling3');

              setTimeout(() => {
                btn.classList.remove("clicked", "door-slammed", "falling");
                setAnimationState('default');
                onClick();
              }, 1000);
            }, parseInt(animationStates.falling2['--walking-duration'] || '300'));
          }, parseInt(animationStates.falling1['--walking-duration'] || '400'));
        }, parseInt(animationStates.walking2['--figure-duration'] || '400'));
      }, parseInt(animationStates.walking1['--figure-duration'] || '300'));
    }
  };

  const currentStyles = animationStates[animationState as keyof typeof animationStates] || animationStates.default;

  return (
    <button
      ref={buttonRef}
      className="logoutButton logoutButton--light"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={currentStyles as React.CSSProperties}
    >
      <svg className="doorway" viewBox="0 0 100 100">
        <path d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z" />
        <path className="bang" d="M40.5 43.7L26.6 31.4l-2.5 6.7zM41.9 50.4l-19.5-4-1.4 6.3zM40 57.4l-17.7 3.9 3.9 5.7z" />
      </svg>
      <svg className="figure" viewBox="0 0 100 100">
        <circle cx="52.1" cy="32.4" r="6.4" />
        <path d="M50.7 62.8c-1.2 2.5-3.6 5-7.2 4-3.2-.9-4.9-3.5-4-7.8.7-3.4 3.1-13.8 4.1-15.8 1.7-3.4 1.6-4.6 7-3.7 4.3.7 4.6 2.5 4.3 5.4-.4 3.7-2.8 15.1-4.2 17.9z" />
        <g className="arm1">
          <path d="M55.5 56.5l-6-9.5c-1-1.5-.6-3.5.9-4.4 1.5-1 3.7-1.1 4.6.4l6.1 10c1 1.5.3 3.5-1.1 4.4-1.5.9-3.5.5-4.5-.9z" />
          <path className="wrist1" d="M69.4 59.9L58.1 58c-1.7-.3-2.9-1.9-2.6-3.7.3-1.7 1.9-2.9 3.7-2.6l11.4 1.9c1.7.3 2.9 1.9 2.6 3.7-.4 1.7-2 2.9-3.8 2.6z" />
        </g>
        <g className="arm2">
          <path d="M34.2 43.6L45 40.3c1.7-.6 3.5.3 4 2 .6 1.7-.3 4-2 4.5l-10.8 2.8c-1.7.6-3.5-.3-4-2-.6-1.6.3-3.4 2-4z" />
          <path className="wrist2" d="M27.1 56.2L32 45.7c.7-1.6 2.6-2.3 4.2-1.6 1.6.7 2.3 2.6 1.6 4.2L33 58.8c-.7 1.6-2.6 2.3-4.2 1.6-1.7-.7-2.4-2.6-1.7-4.2z" />
        </g>
        <g className="leg1">
          <path d="M52.1 73.2s-7-5.7-7.9-6.5c-.9-.9-1.2-3.5-.1-4.9 1.1-1.4 3.8-1.9 5.2-.9l7.9 7c1.4 1.1 1.7 3.5.7 4.9-1.1 1.4-4.4 1.5-5.8.4z" />
          <path className="calf1" d="M52.6 84.4l-1-12.8c-.1-1.9 1.5-3.6 3.5-3.7 2-.1 3.7 1.4 3.8 3.4l1 12.8c.1 1.9-1.5 3.6-3.5 3.7-2 0-3.7-1.5-3.8-3.4z" />
        </g>
        <g className="leg2">
          <path d="M37.8 72.7s1.3-10.2 1.6-11.4 2.4-2.8 4.1-2.6c1.7.2 3.6 2.3 3.4 4l-1.8 11.1c-.2 1.7-1.7 3.3-3.4 3.1-1.8-.2-4.1-2.4-3.9-4.2z" />
          <path className="calf2" d="M29.5 82.3l9.6-10.9c1.3-1.4 3.6-1.5 5.1-.1 1.5 1.4.4 4.9-.9 6.3l-8.5 9.6c-1.3 1.4-3.6 1.5-5.1.1-1.4-1.3-1.5-3.5-.2-5z" />
        </g>
      </svg>
      <svg className="door" viewBox="0 0 100 100">
        <path d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z" />
        <circle cx="66" cy="50" r="3.7" />
      </svg>
      <span className="button-text">Log Out</span>
    </button>
  );
};

const AdminPage = () => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedKey = sessionStorage.getItem('admin-secret-key');
    if (storedKey) {
      setSecretKey(storedKey);
      setIsAuthenticated(true);
    }
  }, []);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const getHeaders = (key: string) => ({
    'Content-Type': 'application/json',
    'x-admin-secret-key': key || '',
  });

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError('');

    const storedKey = sessionStorage.getItem('admin-secret-key');
    const headers = getHeaders(storedKey || '');
    try {
      const [statsRes, messagesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/stats`, { headers }),
        fetch(`${API_BASE_URL}/api/contact`, { headers }),
      ]);

      if (!statsRes.ok) throw new Error(`Failed to fetch stats: ${statsRes.status}`);
      if (!messagesRes.ok) throw new Error(`Failed to fetch messages: ${messagesRes.status}`);

      const statsJson = await statsRes.json();
      const messagesJson = await messagesRes.json();

      setStats(statsJson.data || statsJson);

      const msgs = Array.isArray(messagesJson.data)
        ? messagesJson.data
        : Array.isArray(messagesJson)
          ? messagesJson
          : [];

      const enrichedMessages = msgs.map((msg: any) => ({
        ...msg,
        status: msg.status || 'new',
        priority: msg.priority || 'medium'
      }));
      setMessages(enrichedMessages);
    } catch (err: any) {
      console.error("Dashboard Data Fetch Error:", err);
      setError("Failed to load dashboard data. Access denied or server error.");
      // If error is unauthorized, maybe clearing the key is good
      if (err.message.includes('401') || err.message.includes('403')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    if (isAuthenticated && !stats) {
      fetchDashboardData();
    }
  }, [isAuthenticated, stats, fetchDashboardData]);

  useEffect(() => {
    const filtered = messages.filter(msg => {
      const matchesSearch =
        msg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || msg.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || msg.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });
    setFilteredMessages(filtered);
  }, [searchTerm, messages, filterStatus, filterPriority]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        headers: getHeaders(secretKey),
      });

      if (res.ok) {
        sessionStorage.setItem('admin-secret-key', secretKey);
        setIsAuthenticated(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid secret key. Access denied.');
      }
    } catch (err) {
      console.error("Auth verification error:", err);
      setError('Connection failed. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-secret-key');
    setIsAuthenticated(false);
    setStats(null);
    setMessages([]);
    setError('');
    setSecretKey('');
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) {
      return;
    }
    setDeletingId(id);
    setError('');
    const storedKey = sessionStorage.getItem('admin-secret-key');
    const headers = getHeaders(storedKey || '');
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) throw new Error("Delete failed");

      setMessages(prev => prev.filter(msg => msg._id !== id));
      setSelectedMessage(null);
      fetchDashboardData();
    } catch (err: any) {
      console.error("Delete Error:", err);
      setError(`Deletion failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Star className="w-4 h-4 text-red-500" />;
      case 'medium': return <Award className="w-4 h-4 text-yellow-500" />;
      case 'low': return <EyeOff className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const cardHoverVariants: Variants = {
    rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: {
      scale: 1.03,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
        <DotGlobeHero 
          className="absolute inset-0 z-0" 
          rotationSpeed={0.003} 
          globeRadius={1.2}
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1)_0%,transparent_70%)] z-0" />
        
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg px-6"
          >
            <div className="p-8 md:p-12 bg-slate-900/40 backdrop-blur-3xl rounded-[40px] shadow-[0_0_80px_-15px_rgba(79,70,229,0.3)] border border-white/10">
              <div className="flex flex-col items-center mb-10 text-center">
                <motion.div
                  initial={{ rotate: -20, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="w-20 h-20 bg-linear-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 group overflow-hidden"
                >
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                   <Shield className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Access Control</h1>
                <p className="text-slate-400 font-medium text-lg">System credentials required to proceed.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Authentication Key</label>
                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-5 h-5" />
                    <input
                      type="password"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-12 pr-6 py-4 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white placeholder:text-slate-700"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-white" />
                      <span>Initialize Dashboard</span>
                    </>
                  )}
                </motion.button>
              </form>

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400 text-sm font-semibold"
                >
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  const totalMessages = stats ? Object.values(stats).reduce((acc: number, count: any) => acc + count, 0) : 0;

  return (
    <div className="min-h-screen bg-slate-50 relative dark:bg-slate-950 transition-colors duration-500">
      <style>{`
        .logoutButton {
          --figure-duration: 100ms;
          --transform-figure: none;
          --walking-duration: 100ms;
          --transform-arm1: none;
          --transform-wrist1: none;
          --transform-arm2: none;
          --transform-wrist2: none;
          --transform-leg1: none;
          --transform-calf1: none;
          --transform-leg2: none;
          --transform-calf2: none;
          background: none;
          border: 0;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          height: 40px;
          outline: none;
          padding: 0 0 0 20px;
          perspective: 100px;
          position: relative;
          text-align: left;
          width: 130px;
          -webkit-tap-highlight-color: transparent;
        }
        .logoutButton::before {
          background-color: #f8fafc;
          border-radius: 5px;
          content: "";
          display: block;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          transform: none;
          transition: transform 50ms ease;
          width: 100%;
          z-index: 2;
        }
        .dark .logoutButton::before { background-color: #1e293b; }
        .logoutButton:hover .door { transform: rotateY(20deg); }
        .logoutButton:active::before { transform: scale(0.96); }
        .logoutButton.clicked::before { transform: none; }
        .logoutButton.clicked .door { transform: rotateY(35deg); }
        .logoutButton.door-slammed .door { transform: none; transition: transform 100ms ease-in 250ms; }
        .logoutButton.falling { animation: shake 200ms linear; }
        .logoutButton.falling .bang { animation: flash 300ms linear; }
        .logoutButton.falling .figure {
          animation: spin 1000ms infinite linear;
          bottom: -1080px;
          opacity: 0;
          right: 1px;
          transition: 
            transform calc(var(--figure-duration) * 1ms) linear,
            bottom calc(var(--figure-duration) * 1ms) cubic-bezier(0.7, 0.1, 1, 1) 100ms,
            opacity calc(var(--figure-duration) * 0.25ms) linear calc(var(--figure-duration) * 0.75ms);
          z-index: 1;
        }
        .logoutButton .button-text { color: #0f172a; position: relative; z-index: 10; }
        .dark .logoutButton .button-text { color: #f8fafc; }
        .logoutButton svg { display: block; position: absolute; }
        .figure { bottom: 5px; fill: #4f46e5; right: 18px; transform: var(--transform-figure); transition: transform calc(var(--figure-duration) * 1ms) cubic-bezier(0.2, 0.1, 0.8, 0.9); width: 30px; z-index: 4; }
        .door, .doorway { bottom: 4px; right: 12px; width: 32px; }
        .door { transform: rotateY(20deg); transform-origin: 100% 50%; transform-style: preserve-3d; transition: transform 200ms ease; z-index: 5; fill: #4f46e5; stroke: #4f46e5; stroke-width: 4; }
        .doorway { z-index: 3; fill: #0f172a; }
        .dark .doorway { fill: #f8fafc; }
        .bang { opacity: 0; }
        .arm1, .wrist1, .arm2, .wrist2, .leg1, .calf1, .leg2, .calf2 { transition: transform calc(var(--walking-duration) * 1ms) ease-in-out; }
        .arm1 { transform: var(--transform-arm1); transform-origin: 52% 45%; }
        .wrist1 { transform: var(--transform-wrist1); transform-origin: 59% 55%; }
        .arm2 { transform: var(--transform-arm2); transform-origin: 47% 43%; }
        .wrist2 { transform: var(--transform-wrist2); transform-origin: 35% 47%; }
        .leg1 { transform: var(--transform-leg1); transform-origin: 47% 64.5%; }
        .calf1 { transform: var(--transform-calf1); transform-origin: 55.5% 71.5%; }
        .leg2 { transform: var(--transform-leg2); transform-origin: 43% 63%; }
        .calf2 { transform: var(--transform-calf2); transform-origin: 41.5% 73%; }

        @keyframes spin { from { transform: rotate(0deg) scale(0.94); } to { transform: rotate(359deg) scale(0.94); } }
        @keyframes shake { 0% { transform: rotate(-1deg); } 50% { transform: rotate(2deg); } 100% { transform: rotate(-1deg); } }
        @keyframes flash { 0% { opacity: 0.4; } 100% { opacity: 0; } }
      `}</style>

      {/* Header */}
      <header className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-linear-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl shadow-indigo-500/20">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Vortex Control</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Secure Network Node v4.0</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-right text-right mr-4">
               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">● System Online</p>
               <p className="text-[9px] text-slate-400 font-medium">Ping: 14ms</p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 transition-all hover:scale-110 active:scale-95"
              title="Refresh Data"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-2" />
            <LogoutButton onClick={handleLogout} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { label: 'Unread Intel', value: stats.new || (stats.byStatus?.new || 0), icon: Zap, color: 'from-orange-500 to-amber-500' },
              { label: 'Total Communications', value: stats.totalMessages || 0, icon: MessageSquare, color: 'from-indigo-600 to-blue-500' },
              { label: 'System Reach', value: stats.totalVisits || 0, icon: Activity, color: 'from-emerald-500 to-teal-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white dark:border-white/10 relative overflow-hidden group transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-linear-to-br ${stat.color} rounded-lg shadow-lg`}>
                       <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                  <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`absolute -right-4 -bottom-4 w-32 h-32 bg-linear-to-br ${stat.color} opacity-[0.03] dark:opacity-[0.07] rotate-12 rounded-full group-hover:scale-125 transition-transform duration-700`} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Messages List */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8 md:p-10 border-b border-slate-100 dark:border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Signal Feed</h2>
              <p className="text-xs font-medium text-slate-500">Monitoring incoming engagement and collaboration requests</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Filter signals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-6 py-3.5 bg-slate-50/50 dark:bg-black/20 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 transition-all w-full md:w-72 text-sm font-medium"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${showFilters ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50'}`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
            {showFilters && (
              <div className="flex items-center gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-3 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-3 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sender</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Subject</th>
                  <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-5 text-right text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMessages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <td className="px-8 py-6">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 font-bold">
                          {msg.firstName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{msg.firstName} {msg.lastName}</p>
                          <p className="text-xs text-slate-500">{msg.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xs truncate font-medium">{msg.subject}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(msg.priority)}
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${getStatusColor(msg.status)}`}>
                          {msg.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteMessage(msg._id); }}
                        disabled={deletingId === msg._id}
                        className="p-2 text-slate-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                      >
                        {deletingId === msg._id ? <Loader className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredMessages.length === 0 && !loading && (
            <div className="p-20 text-center">
              <Inbox className="w-20 h-20 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
              <p className="text-xl font-bold text-slate-400">No messages found</p>
            </div>
          )}
        </div>
      </main>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setSelectedMessage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 text-xl font-bold">
                    {selectedMessage.firstName[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedMessage.firstName} {selectedMessage.lastName}</h3>
                    <p className="text-slate-500">{selectedMessage.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <XCircle className="w-8 h-8" />
                </button>
              </div>
              <div className="p-8">
                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Subject</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedMessage.subject}</p>
                </div>
                <div className="mb-8">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Message</p>
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage._id)}
                      className="px-6 py-3 text-red-600 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                    >
                      Delete
                    </button>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
