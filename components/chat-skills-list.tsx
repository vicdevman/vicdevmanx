"use client";

import React from "react";
import { motion } from "framer-motion";
import { Skill } from "@/data/skills";

interface ChatSkillsListProps {
  skills: Skill[];
  title: string;
  category?: string;
}

export default function ChatSkillsList({ skills, title, category }: ChatSkillsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h3 className="font-semibold text-sm mb-2 border-b border-primary/10 pb-1">
        {title}
      </h3>
      
      <div className="grid grid-cols-2 items-start gap-2 mt-3">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-primary/5 rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-primary/10 transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-medium text-sm">{skill.name}</span>
              <div className="flex items-center mt-1">
                <div className="h-1.5 w-24 bg-primary/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs ml-2 text-muted-foreground whitespace-nowrap">
                  {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'yr' : 'yrs'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
