import React, { useState, useEffect, useCallback } from 'react';
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

    // Ensure the stats structure matches your backend
    setStats(statsJson.data?.byStatus || statsJson.data || statsJson);
    
    // Ensure messages is an array
    const msgs = Array.isArray(messagesJson.data) 
      ? messagesJson.data 
      : Array.isArray(messagesJson) 
        ? messagesJson 
        : [];

    // Add default status/priority if missing (to avoid UI errors)
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
      // Simulate API call
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-md"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
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
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgb(239 68 68)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-md"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </motion.button>
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
