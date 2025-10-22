import React, { useRef, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader, LucideIcon } from 'lucide-react';

// Types
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  url: string;
  color: string;
  hoverColor: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

type SubmitStatus = 'idle' | 'success' | 'error';

// Constants
const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    url: 'https://github.com/srinivasaiml',
    color: 'from-gray-700 to-gray-900',
    hoverColor: 'hover:from-gray-600 hover:to-gray-800'
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/patchipala-srinivas-524902256/',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:from-blue-500 hover:to-blue-700'
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    url: 'mailto:psrinivas9381@gmail.com',
    color: 'from-red-500 to-red-700',
    hoverColor: 'hover:from-red-400 hover:to-red-600'
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'WhatsApp',
    url: 'https://wa.me/qr/FIUCYWFM6DGNL1',
    color: 'from-green-500 to-green-700',
    hoverColor: 'hover:from-green-400 hover:to-green-600'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Sub-components
interface FormFieldProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  autoComplete, 
  type = 'text' 
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all"
        placeholder={placeholder}
      />
    </div>
  );
};

interface FormTextareaProps {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  rows = 3 
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all resize-none"
        placeholder={placeholder}
      />
    </div>
  );
};

interface ContactFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  submitMessage: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  handleSubmit,
  isSubmitting,
  submitStatus,
  submitMessage,
  handleInputChange
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-2xl p-5 md:p-7 shadow-xl border border-white/60"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Send a Message</h3>
      
      {submitStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
            submitStatus === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {submitStatus === 'success' ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{submitMessage}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="John"
            autoComplete="given-name"
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            autoComplete="family-name"
          />
        </div>
        
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.doe@example.com"
          autoComplete="email"
        />
        
        <FormField
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="Project collaboration"
        />
        
        <FormTextarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell me about your project..."
          rows={3}
        />
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Info</h3>
      <div className="space-y-3">
        <a 
          href="mailto:psrinivas9381@gmail.com" 
          className="flex items-center group hover:text-blue-600 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm text-gray-700 group-hover:text-blue-600">
            psrinivas9381@gmail.com
          </span>
        </a>
        
        <a 
          href="tel:+917901014143" 
          className="flex items-center group hover:text-green-600 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-sm text-gray-700 group-hover:text-green-600">
            +91 7901014143
          </span>
        </a>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
            <MapPin className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-sm text-gray-700">Andhra Pradesh, India</span>
        </div>
      </div>
    </div>
  );
};

interface SocialLinksProps {
  isInView: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ isInView }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Connect</h3>
      <div className="grid grid-cols-2 gap-3">
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.06 }}
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3.5 bg-gradient-to-br ${link.color} ${link.hoverColor} text-white rounded-xl shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group`}
          >
            <div className="mb-1.5 group-hover:scale-110 transition-transform">
              {link.icon}
            </div>
            <span className="text-xs font-medium">{link.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// Main Component
const Contact: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();

    const nodes: Node[] = [];
    const nodeCount = Math.min(36, Math.floor(window.innerWidth / 35));

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      });
    }

    let animationId: number;
    
    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = node.x - nodes[j].x;
          const dy = node.y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.18 * (1 - distance / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = (): void => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/contact`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40 pointer-events-none"
      />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's discuss new projects, creative ideas, or opportunities to collaborate
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-5 gap-8 items-start"
        >
          <ContactForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            submitMessage={submitMessage}
            handleInputChange={handleInputChange}
          />

          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            <ContactInfo />
            <SocialLinks isInView={isInView} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
