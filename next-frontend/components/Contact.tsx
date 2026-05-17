"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { CursorDrivenParticleTypography } from "@/components/ParticleTypography";
import { useTheme } from './ThemeProvider';

const Contact = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Use environment variable or fallback to localhost:5000
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const API_URL = `${BASE_URL.replace(/\/$/, '')}/api/contact`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus('success');
                setResponseMessage(data.message || 'Message sent successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setStatus('error');
                setResponseMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setResponseMessage('Failed to connect to the server. Please check your connection.');
        } finally {
            // Reset status after a few seconds
            setTimeout(() => {
                setStatus('idle');
                setResponseMessage('');
            }, 5000);
        }
    };

    // Calculate dynamic color for the particles based on a dark or light detection, but using CSS classes is easier for the wrapper
    return (
        <section id="contact" className="relative py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
            {/* Ambient decorative blurs for Contact section */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] dark:hidden" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-200/40 rounded-full blur-[100px] dark:hidden" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Content + World Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-12">
                            {/* Section Header - Left Aligned */}
                            <div className="relative flex items-center py-6 md:py-10 mb-4 overflow-hidden -ml-2 md:-ml-4">
                                <span
                                    className="absolute left-0 text-[5rem] md:text-[7rem] lg:text-[9rem] font-bold text-slate-200/80 dark:text-slate-800/80 select-none z-0 tracking-tighter whitespace-nowrap pointer-events-none"
                                    style={{ fontFamily: "'Brush Script MT', 'Caveat', 'Dancing Script', var(--font-playfair), cursive" }}
                                >
                                    Contact
                                </span>

                                {/* Interactive Particles Header */}
                                <div className="relative z-10 w-full sm:w-[400px] md:w-[450px] -ml-2">
                                    <CursorDrivenParticleTypography
                                        className="h-[120px] md:h-[150px] min-h-[100px]! justify-start text-slate-900 dark:text-white"
                                        text="CONTACT ME."
                                        fontSize={65}
                                        particleDensity={3}
                                        dispersionStrength={20}
                                        color={theme === 'dark' ? '#ffffff' : '#0f172a'}
                                    />
                                </div>
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed relative z-10 mt-[-20px] md:mt-[-30px]">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500 dark:text-slate-500 mb-16">
                            <span>psrinivas9381@gmail.com</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <span>+91 7901014143</span>
                        </div>

                        {/* World Map Background (Illustration) */}
                        <div className="relative">
                            <img
                                src="/world.svg"
                                alt="World Map"
                                className="w-full opacity-80 dark:opacity-20 grayscale brightness-95 dark:brightness-110"
                            />
                            {/* Locator Marker - India */}
                            <div className="absolute top-[43%] left-[72.3%] -translate-x-1/2 -translate-y-1/2 group">
                                <div className="relative flex flex-col items-center">
                                    {/* Indicator Line & Label */}
                                    <div className="absolute bottom-full mb-0 flex flex-col items-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8, duration: 0.5 }}
                                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-[0.2em] shadow-2xl mb-0 whitespace-nowrap"
                                        >
                                            Location
                                        </motion.div>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: 20 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="w-px bg-linear-to-b from-slate-900 dark:from-white to-transparent"
                                        />
                                    </div>
                                    {/* Dot on the map */}
                                    <div className="relative w-2 h-2">
                                        <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-60" />
                                        <div className="relative w-2 h-2 bg-orange-600 rounded-full border border-white shadow-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Premium Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative z-10 flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{responseMessage}</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-8 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
                                    {status === 'error' && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400 text-sm">
                                            <AlertCircle size={18} />
                                            <span>{responseMessage}</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="John"
                                                required
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Doe"
                                                required
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="john@example.com"
                                                required
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                placeholder="Project Inquiry"
                                                required
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                                        <textarea
                                            rows={3}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Type your message here"
                                            required
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm resize-none"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                                        whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                                        disabled={status === 'submitting'}
                                        type="submit"
                                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <span>{status === 'submitting' ? 'Sending...' : 'Submit'}</span>
                                        {status === 'submitting' ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        )}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
