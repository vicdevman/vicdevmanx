"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Experience } from "@/data/experiences";

interface ExperienceCardChatProps {
  experience: Experience;
}

export default function ExperienceCardChat({ experience }: ExperienceCardChatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-primary/5 rounded-lg p-3 mb-3 hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-sm">{experience.company}</h3>
            <p className="text-xs text-primary">{experience.title}</p>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar size={10} />
            <span>{experience.date}</span>
          </div>
        </div>
        
        <p className="text-xs mt-2 line-clamp-2 text-muted-foreground">{experience.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2 mb-2">
          {experience.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
              {tech}
            </span>
          ))}
          {experience.techStack.length > 4 && (
            <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
              +{experience.techStack.length - 4}
            </span>
          )}
        </div>
        
        <div className="flex gap-2 mt-1">
          <Link
            href={`/experiences/${experience.id}`}
            className="text-xs px-2 py-1 bg-primary text-white rounded flex items-center gap-1 hover:bg-primary/90"
          >
            Details <ArrowUpRight size={10} />
          </Link>
          
          <Link
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded flex items-center gap-1"
          >
            Company <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
