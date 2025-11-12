"use client";

import React from "react";
import { Project } from "@/data/projects";
import { Experience } from "@/data/experiences";
import ProjectCardChat from "./project-card-chat";
import ExperienceCardChat from "./experience-card-chat";
import { motion } from "framer-motion";

interface ChatProjectListProps {
  projects?: Project[];
  experiences?: Experience[];
  title: string;
}

export default function ChatProjectList({ projects, experiences, title }: ChatProjectListProps) {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=" w-full"
    >
      <h3 className="font-semibold text-sm mb-2 border-b border-primary/10 pb-1">{title}</h3>
      
      <div className="max-h-60 flex gap-2 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
        {projects && projects.map((project) => (
          <ProjectCardChat key={project.id} project={project} />
        ))}
        
        {experiences && experiences.map((experience) => (
          <ExperienceCardChat key={experience.id} experience={experience} />
        ))}
      </div>
    </motion.div>
    </>
  );
}
