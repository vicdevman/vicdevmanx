"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { experiences, Experience } from "@/data/experiences";
import CursorFollow from "@/components/cursor-follow";
import FloatingNav from "@/components/floating-nav";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ExperiencesPage() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Frontend", "Full Stack", "Blockchain", "AI", "Web3"];
  
  const filteredExperiences = filter === "All" 
    ? experiences 
    : experiences.filter(exp => exp.category?.includes(filter));

  return (
    <div className="bg-theme min-h-screen flex flex-col items-center">
      <FloatingNav />
      <CursorFollow />
      
      <main className="w-full max-w-6xl mx-auto p-6 sm:p-8 mt-16">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h1>
          <p className="text-lg mb-8 max-w-2xl">
            My professional journey across various roles in tech, from frontend development
            to blockchain and AI engineering.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === category
                    ? "bg-primary text-white"
                    : "bg-primary/10 hover:bg-primary/20 text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col gap-8">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/5 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex-1">
          <span className="text-xs font-semibold text-faint">{experience.date}</span>
          <h3 className="text-xl font-semibold mt-1">{experience.company}</h3>
          <p className="text-primary font-medium">{experience.title}</p>
          {experience.location && (
            <p className="text-sm text-faint mt-1">{experience.location}</p>
          )}
        </div>
        
        <Link
          href={experience.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary/10 text-primary rounded-lg flex items-center gap-1 text-sm font-medium hover:bg-primary/20 w-fit"
        >
          Visit Company <ArrowUpRight size={14} />
        </Link>
      </div>
      
      <p className="mb-4">{experience.description}</p>
      
      {experience.achievements && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
          <ul className="list-disc pl-5 space-y-1">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="text-sm">{achievement}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mt-4">
        {experience.techStack.map((tech) => (
          <span key={tech} className="badge">{tech}</span>
        ))}
      </div>
      
      {experience.category && (
        <div className="flex flex-wrap gap-1 mt-4">
          {experience.category.map((cat) => (
            <span key={cat} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {cat}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
