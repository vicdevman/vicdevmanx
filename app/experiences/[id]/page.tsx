"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { getExperienceById } from "@/data/experiences";
import CursorFollow from "@/components/cursor-follow";
import FloatingNav from "@/components/floating-nav";
import { notFound } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const experience = getExperienceById(params.id);
  
  if (!experience) {
    notFound();
  }

  return (
    <div className="bg-theme min-h-screen flex flex-col items-center">
      <FloatingNav />
      <CursorFollow />
      
      <main className="w-full max-w-4xl mx-auto p-6 sm:p-8 mt-16">
        <div className="flex items-center mb-8">
          <Link href="/experiences" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={16} />
            <span>Back to Experiences</span>
          </Link>
        </div>
        
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-primary/5 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">{experience.company}</h1>
                <p className="text-xl text-primary mt-1">{experience.title}</p>
              </div>
              
              <Link
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-1 text-sm font-medium hover:bg-primary/90 w-fit"
              >
                Visit Company <ExternalLink size={14} />
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1 text-faint">
                <Calendar size={16} />
                <span>{experience.date}</span>
              </div>
              
              {experience.location && (
                <div className="flex items-center gap-1 text-faint">
                  <MapPin size={16} />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Role Overview</h2>
            <p className="text-base leading-relaxed mb-4">
              {experience.longDescription || experience.description}
            </p>
          </div>
          
          {experience.achievements && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Key Achievements</h2>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="min-w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
                      ✓
                    </div>
                    <p>{achievement}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Technologies & Skills</h2>
            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span key={tech} className="badge">{tech}</span>
              ))}
            </div>
          </div>
          
          {experience.category && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Areas of Focus</h2>
              <div className="flex flex-wrap gap-2">
                {experience.category.map((cat) => (
                  <span key={cat} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="border-t border-primary/10 pt-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Explore More</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/experiences"
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg inline-flex items-center gap-1 text-sm font-medium hover:bg-primary/20"
              >
                All Experiences
              </Link>
              <Link
                href="/projects"
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg inline-flex items-center gap-1 text-sm font-medium hover:bg-primary/20"
              >
                View Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
