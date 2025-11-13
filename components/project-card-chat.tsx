"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectCardChatProps {
  project: Project;
}

export default function ProjectCardChat({ project }: ProjectCardChatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-primary/5 rounded-lg p-3 mb-3 hover:shadow-md transition-all duration-300"
    >
      <div className="flex gap-3 w-full min-w-72">
        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{project.title}</h3>
          
          <div className="flex flex-wrap gap-1 my-1">
            {project.category.slice(0, 2).map((cat) => (
              <span key={cat} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
          
          <p className="text-xs line-clamp-2 text-muted-foreground">{project.description}</p>
          
          <div className="flex gap-2 mt-2">
            <Link
              href={`/projects/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2 py-1 bg-primary text-white rounded flex items-center gap-1 hover:bg-primary/90"
            >
              Details <ArrowUpRight size={10} />
            </Link>
            
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded flex items-center gap-1"
              >
                <Github size={10} /> Code
              </Link>
            )}
            
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded flex items-center gap-1"
              >
                <ArrowUpRight size={10} /> Live
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
