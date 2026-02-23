import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Send, MapPin, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact({ isDarkMode }) {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const theme = {
    bg: isDarkMode ? 'bg-[#0A0E0C]' : 'bg-[#FCFAF8]',
    title: isDarkMode ? 'text-[#C5A572]' : 'text-[#2F4538]',
    body: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    card: isDarkMode ? 'bg-[#111814] border-white/5' : 'bg-white border-gray-100',
    input: isDarkMode ? 'border-white/10 text-white placeholder:text-gray-600' : 'border-gray-200 text-black placeholder:text-gray-400',
    iconBg: isDarkMode ? 'bg-white/5' : 'bg-gray-50',
    label: isDarkMode ? 'text-gray-500' : 'text-gray-400'
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // 1. Honeypot Anti-Spam Check
    const botField = form.current.hp_field.value;
    if (botField) {
      console.warn("Bot activity detected.");
      return; // Stop execution silently so the bot thinks it succeeded
    }

    // 2. Rate Limiting (Prevent sending more than once every 30 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      alert("Please wait a moment before sending another message.");
      return;
    }

    setIsSubmitting(true);

    const PUBLIC_KEY = "PTgi0hVvyAzFxdnca"; 
    const SERVICE_ID = 'service_kp1pls5';
    const ADMIN_TEMPLATE = 'template_4vj51rs';
    const CLIENT_AUTO_REPLY = 'template_ft7b8ui';

    const formData = new FormData(form.current);
    const subject = formData.get('subject');
    
    let dynamicMessage = "Thank you for reaching out. I have received your inquiry and will review the details shortly. Expect a response within 24-48 hours.";
    
    if (subject === "Image Takedown Request") {
      dynamicMessage = "I have received your takedown request. To process this accurately, please reply to this email with a screenshot or link to the specific image. Once confirmed, it will be removed within 24 hours.";
    }

    const templateParams = {
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      subject: subject,
      message: formData.get('message'),
      dynamic_message: dynamicMessage 
    };

    emailjs.sendForm(SERVICE_ID, ADMIN_TEMPLATE, form.current, PUBLIC_KEY)
      .then(() => {
        return emailjs.send(SERVICE_ID, CLIENT_AUTO_REPLY, templateParams, PUBLIC_KEY);
      })
      .then(() => {
        setIsSubmitting(false);
        setIsSent(true);
        setLastSubmitTime(Date.now());
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("EmailJS Error:", error);
        alert("Something went wrong. Please email arthuro.pbhs@gmail.com directly.");
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className={`pt-32 pb-24 px-6 transition-colors duration-1000 ${theme.bg} min-h-screen`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className="text-[10px] text-[#C5A572] tracking-[0.3em] uppercase block mb-4 font-sans font-medium">Get In Touch</span>
          <h2 className={`text-6xl font-serif italic mb-8 transition-colors duration-1000 ${theme.title}`}>Let's Work.</h2>
          <p className={`${theme.body} font-sans font-light leading-relaxed mb-12 max-w-md transition-colors duration-1000`}>
            Whether you're looking to book a session, request a high-res gallery for a team, or inquire about a takedown, I'm here to help. 
          </p>
          <div className="space-y-8">
            <ContactItem icon={<Mail size={18} />} label="Email" value="arthuro.pbhs@gmail.com" isDarkMode={isDarkMode} theme={theme} />
            <ContactItem icon={<Instagram size={18} />} label="Instagram" value="@arthur0_2025" isDarkMode={isDarkMode} theme={theme} />
            <ContactItem icon={<MapPin size={18} />} label="Location" value="South Florida / Available for Travel" isDarkMode={isDarkMode} theme={theme} />
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className={`${theme.card} p-8 md:p-12 border shadow-sm rounded-sm transition-all duration-1000 relative overflow-hidden`}
        >
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form key="contact-form" ref={form} onSubmit={sendEmail} initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                
                {/* Honeypot field - Hidden from users */}
                <input type="text" name="hp_field" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Name</label>
                    <input name="user_name" type="text" required className={`w-full bg-transparent border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors`} placeholder="Full Name" />
                  </div>
                  <div>
                    <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Email</label>
                    <input name="user_email" type="email" required className={`w-full bg-transparent border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors`} placeholder="email@address.com" />
                  </div>
                </div>
                <div>
                  <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Subject</label>
                  <select name="subject" className={`w-full border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors bg-transparent cursor-pointer`}>
                    <option value="Booking Inquiry" className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Booking Inquiry</option>
                    <option value="Commercial Licensing" className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Commercial Licensing</option>
                    <option value="Image Takedown Request" className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Image Takedown Request</option>
                    <option value="Other" className={isDarkMode ? 'bg-[#0A0E0C]' : 'bg-white'}>Other</option>
                  </select>
                </div>
                <div>
                  <label className={`text-[9px] uppercase tracking-widest ${theme.label} mb-2 block`}>Message</label>
                  <textarea name="message" rows="4" required className={`w-full bg-transparent border-b ${theme.input} py-2 focus:border-[#C5A572] outline-none font-light text-sm transition-colors resize-none`} placeholder="How can I help you?"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-[#2F4538] hover:bg-[#C5A572]'} text-white py-4 rounded-sm text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 group shadow-lg`}>
                  <Send size={14} className={isSubmitting ? "" : "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </motion.form>
            ) : (
              <motion.div key="success-message" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-[#C5A572]/20 rounded-full flex items-center justify-center text-[#C5A572]"><CheckCircle2 size={40} /></div>
                <div>
                  <h3 className={`text-2xl font-serif italic mb-2 ${isDarkMode ? 'text-white' : 'text-[#2F4538]'}`}>Message Received</h3>
                  <p className={`text-sm font-light ${theme.body} max-w-[250px]`}>Thanks for reaching out! I'll get back to you as soon as possible.</p>
                </div>
                <button onClick={() => setIsSent(false)} className="text-[10px] uppercase tracking-[0.2em] text-[#C5A572] border-b border-[#C5A572] pb-1 hover:text-[#2F4538] hover:border-[#2F4538] transition-colors">Send another message</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ContactItem({ icon, label, value, isDarkMode, theme }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className={`p-3 ${theme.iconBg} rounded-full text-[#C5A572] transition-colors group-hover:bg-[#C5A572] group-hover:text-white`}>{icon}</div>
      <div>
        <h4 className={`text-[10px] tracking-widest uppercase font-bold mb-1 ${isDarkMode ? 'text-[#C5A572]' : 'text-black'}`}>{label}</h4>
        <p className={`text-sm font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{value}</p>
      </div>
    </div>
  );
}