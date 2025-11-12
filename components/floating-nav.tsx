"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  User,
  Briefcase,
  SquareDashedTopSolid,
  LayoutDashboard,
  Phone
 } from 'lucide-react';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Work', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('about');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Adjust this value to add more or less space
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed sm:top-6 top-4 sm:right-20 max-sm:left-1/2 max-sm:-translate-x-1/2 z-50  bg-primary/10 backdrop-blur-md border border-primary/10 rounded-xl p-1.5">
      <div className="relative flex items-center ">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative px-4 py-2 text-sm text-primary rounded-lg transition-colors duration-100 ${
              activeSection === item.id ? 'text-white' : 'text-fade hover:text-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='relative z-5 font-medium'>{item.name}</span>
            {activeSection === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary rounded-lg z-4"
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
