import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MapPin, CheckCircle, X } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('');
    } else if (!re.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (emailError) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    const path = 'messages';
    try {
      // Save message to Firestore
      await addDoc(collection(db, path), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'new'
      });
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      setSubmitError(error.message || 'Failed to send message. Please try again.');
      // We still call handleFirestoreError for logging/monitoring if desired
      try {
        handleFirestoreError(error, OperationType.CREATE, path);
      } catch (e) {
        // Already handled locally for UI
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col">
        <div className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-6">Inquiry</h2>
          <h3 className="text-5xl md:text-[100px] font-display font-black text-fg-main leading-[0.8] uppercase tracking-tighter">
            Let's build <br />
            <span className="text-gray-500 opacity-40">The Future</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 relative">
          <div className="lg:col-span-4 space-y-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4">Contact Info</p>
              <p className="text-xl font-medium text-fg-main">madhavdodiya2017@gmail.com</p>
              <p className="text-xl font-medium text-fg-main">+91 81406 74266</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4">Location</p>
              <p className="text-xl font-medium text-fg-main">Ahmedabad, Gujarat, IND</p>
              <p className="text-xl font-medium text-fg-main">Worldwide / Remote</p>
            </div>
          </div>

          <div className="lg:col-span-8 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                      <input 
                        type="text" 
                        required
                        placeholder="NAME"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border border-border-theme p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors"
                      />
                      <div className="flex flex-col gap-2">
                        <input 
                          type="email" 
                          required
                          placeholder="EMAIL"
                          value={formData.email}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({...formData, email: value});
                            validateEmail(value);
                          }}
                          className={`w-full bg-transparent border ${emailError ? 'border-red-500' : 'border-border-theme'} p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors`}
                        />
                        {emailError && (
                          <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{emailError}</span>
                        )}
                      </div>
                    </div>
                    <input 
                      type="text" 
                      required
                      placeholder="SUBJECT"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-transparent border border-border-theme p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors"
                    />
                    <textarea 
                      rows={4}
                      required
                      placeholder="PROJECT BRIEF"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent border border-border-theme p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors resize-none"
                    ></textarea>
                    
                    {submitError && (
                      <div className="p-4 border border-red-500 bg-red-500/5 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                        {submitError}
                      </div>
                    )}

                    <motion.button 
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { backgroundColor: 'var(--fg-main)', color: 'var(--bg-page)' } : {}}
                      className="mt-4 bg-accent text-black font-black p-8 text-[11px] tracking-[0.4em] uppercase transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Request'}
                    </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center h-full border border-accent bg-accent/5 p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle className="text-accent w-20 h-20 mb-8" />
                  </motion.div>
                  <h4 className="text-3xl font-display font-black text-fg-main uppercase tracking-tighter mb-4">Request Sent</h4>
                  <p className="text-gray-500 mb-8 max-w-sm">Thank you for reaching out! Your inquiry has been received. We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-accent hover:text-fg-main transition-colors"
                  >
                    <X size={14} />
                    Dismiss
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
