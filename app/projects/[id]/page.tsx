"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { getProjectById } from "@/data/projects";
import CursorFollow from "@/components/cursor-follow";
import FloatingNav from "@/components/floating-nav";
import { notFound } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="bg-theme min-h-screen flex flex-col items-center">
      <FloatingNav />
      <CursorFollow />
      
      <main className="w-full max-w-4xl mx-auto p-6 sm:p-8 mt-16">
        <div className="flex items-center mb-8">
          <Link href="/projects" className="flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
        </div>
        
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
            
            <div className="flex gap-2">
              {project.demoLink && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-1 text-sm font-medium hover:bg-primary/90"
                >
                  Live Demo <ExternalLink size={14} />
                </Link>
              )}
              
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg flex items-center gap-1 text-sm font-medium hover:bg-primary/20"
                >
                  Source <Github size={14} />
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.category.map((cat) => (
              <span key={cat} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-base leading-relaxed mb-4">
              {project.longDescription || project.description}
            </p>
            
            {project.role && (
              <p className="text-base mb-4">
                <span className="font-semibold">My Role:</span> {project.role}
              </p>
            )}
            
            <p className="text-base">
              <span className="font-semibold">Completed:</span> {project.completionDate}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="badge">{tech}</span>
              ))}
            </div>
          </div>
          
          <div className="border-t border-primary/10 pt-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Explore More Projects</h2>
            <Link
              href="/projects"
              className="px-4 py-2 bg-primary/10 text-primary rounded-lg inline-flex items-center gap-1 text-sm font-medium hover:bg-primary/20"
            >
              View All Projects
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
