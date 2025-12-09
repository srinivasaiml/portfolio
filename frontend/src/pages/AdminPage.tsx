import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Eye, Mail, BarChart2, Loader, LogIn, LogOut, 
  AlertTriangle, Inbox, Trash2, TrendingUp, Users, Clock,
  CheckCircle, XCircle, Filter, Search, Download, RefreshCw,
  MessageSquare, Calendar, ArrowUpRight, ChevronDown, ChevronUp,
  EyeOff, Key, User, Globe, Phone, MapPin, Tag, Star, Award
} from 'lucide-react';

interface Stats {
  totalVisits: number;
  totalMessages: number;
  new?: number;
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

      // Add the CSS classes for the animation
      btn.classList.add("clicked");
      
      // Set walking1 state
      setAnimationState('walking1');
      
      setTimeout(() => {
        btn.classList.add("door-slammed");
        // Set walking2 state
        setAnimationState('walking2');
        
        setTimeout(() => {
          btn.classList.add("falling");
          // Set falling1 state
          setAnimationState('falling1');
          
          setTimeout(() => {
            // Set falling2 state
            setAnimationState('falling2');
            
            setTimeout(() => {
              // Set falling3 state
              setAnimationState('falling3');
              
              setTimeout(() => {
                btn.classList.remove("clicked", "door-slammed", "falling");
                // Reset to default state
                setAnimationState('default');
                // Trigger real logout after animation
                onClick();
              }, 1000);
            }, parseInt(animationStates.falling2['--walking-duration'] || '300'));
          }, parseInt(animationStates.falling1['--walking-duration'] || '400'));
        }, parseInt(animationStates.walking2['--figure-duration'] || '400'));
      }, parseInt(animationStates.walking1['--figure-duration'] || '300'));
    }
  };

  // Get the current animation state styles
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

  // Mock data for demonstration
  const mockMessages: Message[] = [
    {
      _id: '1',
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      subject: 'Website Feedback',
      message: 'I love the new design! The navigation is much more intuitive now.',
      createdAt: '2025-10-25T14:30:00Z',
      status: 'new',
      priority: 'medium'
    },
    {
      _id: '2',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.w@example.com',
      subject: 'Urgent: Payment Issue',
      message: 'I tried to complete my purchase but the payment gateway failed twice.',
      createdAt: '2025-10-25T12:15:00Z',
      status: 'new',
      priority: 'high'
    },
    {
      _id: '3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'm.chen@example.com',
      subject: 'Partnership Opportunity',
      message: 'Our company would like to explore a partnership with your organization.',
      createdAt: '2025-10-24T18:45:00Z',
      status: 'read',
      priority: 'medium'
    },
    {
      _id: '4',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.d@example.com',
      subject: 'Feature Request',
      message: 'Could you add dark mode to the website? It would be great for night use.',
      createdAt: '2025-10-24T09:20:00Z',
      status: 'replied',
      priority: 'low'
    }
  ];

  useEffect(() => {
    const storedKey = sessionStorage.getItem('admin-secret-key');
    if (storedKey) {
      setSecretKey(storedKey);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && !stats) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKey) {
      sessionStorage.setItem('admin-secret-key', secretKey);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin-secret-key');
    setIsAuthenticated(false);
    setStats(null);
    setMessages([]);
    setError('');
  };

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const getHeaders = (key: string) => ({
    'Content-Type': 'application/json',
    'x-admin-secret-key': key || '',
  });

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError('');
    if (!API_BASE_URL) {
      setError("Configuration Error: VITE_API_BASE_URL is not set.");
      setLoading(false);
      return;
    }
    const storedKey = sessionStorage.getItem('admin-secret-key');
    const headers = getHeaders(storedKey || '');
    try {
      const [statsRes, messagesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/contact/stats`, { headers }),
        fetch(`${API_BASE_URL}/api/contact`, { headers }),
      ]);
      if (!statsRes.ok) throw new Error(`Failed to fetch stats: ${statsRes.status}`);
      if (!messagesRes.ok) throw new Error(`Failed to fetch messages: ${messagesRes.status}`);
      const statsJson = await statsRes.json();
      const messagesJson = await messagesRes.json();

      setStats(statsJson.data?.byStatus || statsJson.data || statsJson);

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
      handleLogout();
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) {
      return;
    }
    setDeletingId(id);
    setError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
        <style>{`
          html, body { margin: 0; padding: 0; }
        `}</style>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="p-8 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
              <motion.div 
                className="flex flex-col items-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  className="relative mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-md opacity-70" />
                  <Shield className="relative w-24 h-24 text-white" />
                </motion.div>
                <h1 className="text-4xl font-bold text-white mb-3">
                  Admin Access
                </h1>
                <p className="text-indigo-200">Secure authentication required</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="relative mb-6">
                  <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 w-5 h-5" />
                  <input
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter your secret key"
                    className="w-full pl-12 pr-5 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all placeholder:text-indigo-200 text-white"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  onClick={handlePasswordSubmit}
                  className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <LogIn className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Unlock Dashboard</span>
                </motion.button>
              </motion.div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-6 text-red-200 bg-red-500/20 p-4 rounded-xl border border-red-400/30"
                >
                  <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{error}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
      {/* ✅ Fixed CSS for animated logout button */}
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
          font-family: "Quicksand", sans-serif;
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
          background-color: #f4f7ff;
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
        .logoutButton:hover .door {
          transform: rotateY(20deg);
        }
        .logoutButton:active::before {
          transform: scale(0.96);
        }
        .logoutButton:active .door {
          transform: rotateY(28deg);
        }
        .logoutButton.clicked::before {
          transform: none;
        }
        .logoutButton.clicked .door {
          transform: rotateY(35deg);
        }
        .logoutButton.door-slammed .door {
          transform: none;
          transition: transform 100ms ease-in 250ms;
        }
        .logoutButton.falling {
          animation: shake 200ms linear;
        }
        .logoutButton.falling .bang {
          animation: flash 300ms linear;
        }
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
        .logoutButton--light .button-text {
          color: #1f2335;
        }
        .logoutButton--light .door,
        .logoutButton--light .doorway {
          fill: #1f2335;
        }
        .button-text {
          position: relative;
          z-index: 10;
        }
        .logoutButton svg {
          display: block;
          position: absolute;
        }
        .figure {
          bottom: 5px;
          fill: #4371f7;
          right: 18px;
          transform: var(--transform-figure);
          transition: transform calc(var(--figure-duration) * 1ms) cubic-bezier(0.2, 0.1, 0.8, 0.9);
          width: 30px;
          z-index: 4;
        }
        .door,
        .doorway {
          bottom: 4px;
          right: 12px;
          width: 32px;
        }
        .door {
          transform: rotateY(20deg);
          transform-origin: 100% 50%;
          transform-style: preserve-3d;
          transition: transform 200ms ease;
          z-index: 5;
        }
        .door path {
          fill: #4371f7;
          stroke: #4371f7;
          stroke-width: 4;
        }
        .doorway {
          z-index: 3;
        }
        .bang {
          opacity: 0;
        }
        .arm1, .wrist1, .arm2, .wrist2,
        .leg1, .calf1, .leg2, .calf2 {
          transition: transform calc(var(--walking-duration) * 1ms) ease-in-out;
        }
        .arm1 { transform: var(--transform-arm1); transform-origin: 52% 45%; }
        .wrist1 { transform: var(--transform-wrist1); transform-origin: 59% 55%; }
        .arm2 { transform: var(--transform-arm2); transform-origin: 47% 43%; }
        .wrist2 { transform: var(--transform-wrist2); transform-origin: 35% 47%; }
        .leg1 { transform: var(--transform-leg1); transform-origin: 47% 64.5%; }
        .calf1 { transform: var(--transform-calf1); transform-origin: 55.5% 71.5%; }
        .leg2 { transform: var(--transform-leg2); transform-origin: 43% 63%; }
        .calf2 { transform: var(--transform-calf2); transform-origin: 41.5% 73%; }

        @keyframes spin {
          from { transform: rotate(0deg) scale(0.94); }
          to { transform: rotate(359deg) scale(0.94); }
        }
        @keyframes shake {
          0% { transform: rotate(-1deg); }
          50% { transform: rotate(2deg); }
          100% { transform: rotate(-1deg); }
        }
        @keyframes flash {
          0% { opacity: 0.4; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Admin</h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100"
          >
            {isMobileMenuOpen ? <XCircle className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={fetchDashboardData}
                className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-xl hover:bg-indigo-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              {/* ✅ Fixed Mobile Logout Button */}
              <div className="flex justify-center">
                <LogoutButton onClick={handleLogout} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-8 py-4 w-full"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <motion.div
                className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">Welcome back, administrator</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchDashboardData}
                className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-xl hover:bg-indigo-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </motion.button>
              {/* ✅ Fixed Desktop Logout Button */}
              <LogoutButton onClick={handleLogout} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading && (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-12 h-12 text-indigo-600" />
            </motion.div>
          </div>
        )}
        {error && (
          <motion.div 
            variants={itemVariants} 
            className="flex items-center text-red-700 bg-red-50 p-5 rounded-2xl border border-red-200 mb-6 shadow-sm"
          >
            <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}

        {/* Stats Cards */}
        {stats && !loading && (
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-md border border-blue-100 overflow-hidden relative"
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full -mr-16 -mt-16" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">New Messages</p>
                  <p className="text-4xl font-bold text-gray-800 mb-2">{stats.new || 0}</p>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">Requires attention</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Eye className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-md border border-green-100 overflow-hidden relative"
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full -mr-16 -mt-16" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Total Submissions</p>
                  <p className="text-4xl font-bold text-gray-800 mb-2">{totalMessages}</p>
                  <div className="flex items-center text-blue-600 text-sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span className="font-medium">All time</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-2xl shadow-md border border-purple-100 overflow-hidden relative"
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-fuchsia-600/20 rounded-full -mr-16 -mt-16" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">Response Rate</p>
                  <p className="text-4xl font-bold text-gray-800 mb-2">98%</p>
                  <div className="flex items-center text-purple-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="font-medium">Excellent</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl shadow-lg">
                  <BarChart2 className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Messages Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-1">
                  <MessageSquare className="w-6 h-6 mr-3 text-indigo-600" />
                  Contact Messages
                </h2>
                <p className="text-sm text-gray-600">Manage and respond to user inquiries</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all w-full"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {showFilters ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </button>
              </div>
            </div>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Name
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {filteredMessages.map((msg, index) => (
                    <motion.tr 
                      key={msg._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.03, duration: 0.4 }}
                      className="hover:bg-indigo-50/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold mr-3">
                            {msg.firstName[0]}{msg.lastName[0]}
                          </div>
                          <div className="font-medium text-gray-800">
                            {`${msg.firstName} ${msg.lastName}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <a 
                          href={`mailto:${msg.email}`}
                          className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium flex items-center group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {msg.email}
                          <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-700 font-medium max-w-xs truncate">
                          {msg.subject}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {getPriorityIcon(msg.priority)}
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(msg.status)}`}>
                            {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteMessage(msg._id)}
                          disabled={deletingId === msg._id}
                          className={`p-2 rounded-xl transition-all ${
                            deletingId === msg._id 
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                              : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-md'
                          }`}
                          title="Delete Message"
                        >
                          {deletingId === msg._id ? (
                            <Loader className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {filteredMessages.length === 0 && !loading && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                <Inbox className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">No messages found</p>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Your inbox is currently empty'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg mr-4">
                      {selectedMessage.firstName[0]}{selectedMessage.lastName[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {`${selectedMessage.firstName} ${selectedMessage.lastName}`}
                      </h3>
                      <div className="flex items-center mt-1">
                        <a 
                          href={`mailto:${selectedMessage.email}`}
                          className="text-sm text-indigo-600 hover:underline flex items-center"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                  </span>
                  <div className="ml-3 flex items-center">
                    {getPriorityIcon(selectedMessage.priority)}
                    <span className="ml-1 text-sm text-gray-600 capitalize">
                      {selectedMessage.priority} priority
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Subject</p>
                    <span className="text-xs text-gray-400">#{selectedMessage._id}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{selectedMessage.subject}</p>
                </div>
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Message</p>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Received</p>
                  <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-xl">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Reply
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDeleteMessage(selectedMessage._id)}
                    disabled={deletingId === selectedMessage._id}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      deletingId === selectedMessage._id
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-red-50 text-red-600 hover:bg-red-500 hover:text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {deletingId === selectedMessage._id ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;