"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function ChatContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await axios.post("/api/contact", formData);
      
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.response?.data?.error || "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h3 className="font-semibold text-sm mb-2 border-b border-primary/10 pb-1">
        Get in Touch
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-primary/5 rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-primary/5 rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
          />
        </div>
        
        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 bg-primary/5 rounded-lg border border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all resize-none"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </div>
        
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center gap-2 text-sm"
          >
            <CheckCircle size={16} />
            <span>Message sent successfully! I'll get back to you soon.</span>
          </motion.div>
        )}
        
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 text-sm"
          >
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
