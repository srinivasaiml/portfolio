import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Eye, Mail, BarChart2, Loader, LogIn, LogOut, 
  AlertTriangle, Inbox, Trash2 // <-- Import Trash2 icon
} from 'lucide-react';

// Define types for our data
interface Stats {
  totalVisits: number;
  totalMessages: number;
}

interface Message {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminPage = () => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null); // State for tracking the message currently being deleted

  // Check session storage on load to stay logged in
  useEffect(() => {
    const storedKey = sessionStorage.getItem('admin-secret-key');
    if (storedKey) {
      setSecretKey(storedKey);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && !stats) { // Only fetch if data is not already loaded
      fetchDashboardData();
    }
  }, [isAuthenticated]);
  
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

  const fetchDashboardData = async () => {
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
        fetch(`${API_BASE_URL}/api/contact/stats`, { headers }), // <-- Changed to /api/contact/stats as per your backend
        fetch(`${API_BASE_URL}/api/contact`, { headers }), // <-- Changed to /api/contact as per your backend
      ]);
      if (!statsRes.ok) throw new Error(`Failed to fetch stats: Server responded with status ${statsRes.status}`);
      if (!messagesRes.ok) throw new Error(`Failed to fetch messages: Server responded with status ${messagesRes.status}`);
      
      const statsJson = await statsRes.json();
      const messagesJson = await messagesRes.json();

      // IMPORTANT: Your backend provides stats under /api/contact/stats and messages under /api/contact
      setStats(statsJson.data.byStatus); // Assuming stats are structured like { total: X, today: Y, byStatus: { new: Z } }
      setMessages(messagesJson.data); // Messages are an array inside the data property
      
    } catch (err: any) {
      console.error("Dashboard Data Fetch Error:", err);
      setError("Failed to load dashboard data. Access denied or server error.");
      handleLogout(); // Log out on error
    } finally {
      setLoading(false);
    }
  };

  // --- NEW FUNCTION: DELETE CONTACT MESSAGE ---
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) {
      return;
    }

    setDeletingId(id);
    setError('');

    const storedKey = sessionStorage.getItem('admin-secret-key');
    if (!storedKey) {
      setError("Not authenticated for delete operation.");
      setDeletingId(null);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
        headers: getHeaders(storedKey),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete message: Server responded with status ${response.status}`);
      }

      // Update the UI: Remove the deleted message from the local state
      setMessages(prev => prev.filter(msg => msg._id !== id));
      
      // Optionally, refetch stats to update total message count
      fetchDashboardData(); 

    } catch (err: any) {
      console.error("Delete Error:", err);
      setError(`Deletion failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };
  // ------------------------------------------

  // Animation Variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (!isAuthenticated) {
    // ... (Authentication form remains the same)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <form onSubmit={handlePasswordSubmit} className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-sm border border-white/30">
              <div className="flex flex-col items-center mb-6">
                <Shield className="w-16 h-16 text-blue-600 mb-3" />
                <h1 className="text-3xl font-bold text-gray-800">Admin Access</h1>
                <p className="text-gray-500">Enter your secret key to proceed</p>
              </div>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Your Secret Key"
                className="w-full px-4 py-3 mb-4 bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Unlock
              </motion.button>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center mt-4 text-red-600 bg-red-100 p-3 rounded-lg border border-red-200"
                >
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgb(239 68 68)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </motion.button>
        </motion.div>
        
        {loading && <div className="flex justify-center items-center py-16"><Loader className="animate-spin w-12 h-12 text-blue-600" /></div>}
        
        {error && (
          <motion.div variants={itemVariants} className="flex items-center text-red-700 bg-red-100 p-4 rounded-lg border border-red-200">
            <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}

        {stats && !loading && (
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-base text-gray-500">Total Unique Visits</p>
                {/* Note: stats.totalVisits is not available in your /api/contact/stats. 
                   You might need to adjust this to show another stat like total new messages */}
                <p className="text-4xl font-bold text-gray-800">{stats.new || 'N/A'}</p> 
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-base text-gray-500">Total Form Submissions</p>
                {/* Assuming total is the sum of all status types */}
                <p className="text-4xl font-bold text-gray-800">
                  {Object.values(stats).reduce((acc: number, count: any) => acc + count, 0)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <BarChart2 className="w-7 h-7 mr-3 text-purple-600" />
              Contact Form Submissions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Date</th>
                  <th className="p-4 font-semibold text-gray-600">Name</th>
                  <th className="p-4 font-semibold text-gray-600">Email</th>
                  <th className="p-4 font-semibold text-gray-600">Subject</th>
                  <th className="p-4 font-semibold text-gray-600">Message</th>
                  <th className="p-4 font-semibold text-gray-600">Actions</th> {/* <-- New Column */}
                </tr>
              </thead>
              <tbody>
                {messages.map((msg, index) => (
                  <motion.tr 
                    key={msg._id} 
                    className="border-b border-gray-100 hover:bg-slate-50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{new Date(msg.createdAt).toLocaleString()}</td>
                    <td className="p-4 font-medium text-gray-800">{`${msg.firstName} ${msg.lastName}`}</td>
                    <td className="p-4 text-blue-600 hover:underline"><a href={`mailto:${msg.email}`}>{msg.email}</a></td>
                    <td className="p-4 text-gray-700">{msg.subject}</td>
                    <td className="p-4 text-sm text-gray-700 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                    <td className="p-4">
                      {/* --- NEW DELETE BUTTON --- */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteMessage(msg._id)}
                        disabled={deletingId === msg._id}
                        className={`p-2 rounded-full transition-colors ${
                          deletingId === msg._id 
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                            : 'bg-red-100 text-red-600 hover:bg-red-500 hover:text-white'
                        }`}
                        title="Delete Message"
                      >
                        {deletingId === msg._id ? (
                          <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </motion.button>
                      {/* ------------------------- */}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {messages.length === 0 && !loading && (
            <div className="text-center py-16 text-gray-500">
              <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-xl font-semibold">No messages yet.</p>
              <p>Your inbox is currently empty.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPage;