import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MapPin, CheckCircle, X } from 'lucide-react';
import { useState, FormEvent, FocusEvent } from 'react';
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
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) error = 'Subject is required';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().split(/\s+/).length < 5) error = 'Message should be at least 5 words';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const subjectError = validateField('subject', formData.subject);
    const messageError = validateField('message', formData.message);

    if (nameError || emailError || subjectError || messageError) {
      return;
    }
    
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
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col">
        <div className="mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-black mb-6">Inquiry</h2>
          <h3 className="text-4xl sm:text-5xl md:text-[100px] font-display font-black text-fg-main leading-[0.8] uppercase tracking-tighter">
            Let's build <br />
            <span className="text-gray-500 opacity-40">The Future</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 relative">
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4">Contact Info</p>
              <p className="text-lg md:text-xl font-medium text-fg-main break-all sm:break-normal">madhavdodiya2017@gmail.com</p>
              <p className="text-lg md:text-xl font-medium text-fg-main">+91 81406 74266</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 mb-4">Location</p>
              <p className="text-lg md:text-xl font-medium text-fg-main">Ahmedabad, Gujarat, IND</p>
              <p className="text-lg md:text-xl font-medium text-fg-main">Worldwide / Remote</p>
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
                  noValidate
                >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <input 
                          type="text" 
                          name="name"
                          placeholder="NAME"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({...formData, name: e.target.value});
                            if (errors.name) validateField('name', e.target.value);
                          }}
                          onBlur={handleBlur}
                          className={`w-full bg-transparent border ${errors.name ? 'border-red-500' : 'border-border-theme'} p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors`}
                        />
                        {errors.name && (
                          <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest px-1">{errors.name}</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <input 
                          type="email" 
                          name="email"
                          placeholder="EMAIL"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({...formData, email: e.target.value});
                            if (errors.email) validateField('email', e.target.value);
                          }}
                          onBlur={handleBlur}
                          className={`w-full bg-transparent border ${errors.email ? 'border-red-500' : 'border-border-theme'} p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors`}
                        />
                        {errors.email && (
                          <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest px-1">{errors.email}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <input 
                        type="text" 
                        name="subject"
                        placeholder="SUBJECT"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({...formData, subject: e.target.value});
                          if (errors.subject) validateField('subject', e.target.value);
                        }}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border ${errors.subject ? 'border-red-500' : 'border-border-theme'} p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors`}
                      />
                      {errors.subject && (
                        <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest px-1">{errors.subject}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <textarea 
                        rows={4}
                        name="message"
                        placeholder="PROJECT BRIEF"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({...formData, message: e.target.value});
                          if (errors.message) validateField('message', e.target.value);
                        }}
                        onBlur={handleBlur}
                        className={`w-full bg-transparent border ${errors.message ? 'border-red-500' : 'border-border-theme'} p-6 text-[11px] font-bold tracking-[0.3em] text-fg-main focus:border-accent outline-none transition-colors resize-none`}
                      ></textarea>
                      {errors.message && (
                        <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest px-1">{errors.message}</span>
                      )}
                    </div>
                    
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
