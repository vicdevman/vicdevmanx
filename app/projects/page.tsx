"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import CursorFollow from "@/components/cursor-follow";
import FloatingNav from "@/components/floating-nav";
import MainHeader from "@/components/main-header";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Web App", "Web3", "AI", "SaaS", "Blockchain", "DeFi", "NFT"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category.includes(filter));

  return (
    <div className="bg-theme min-h-screen flex flex-col items-center">
      {/* <MainHeader /> */}
      <CursorFollow />
      
      <main className="w-full max-w-6xl mx-auto p-6 sm:p-8 mt-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="group flex items-center gap-2 text-primary hover:underline transition-all">
            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span>Back to Home</span>
          </Link>
          <Link 
            href="/" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary flex items-center gap-1 group hover:text-primary/80 transition-all"
          >
            View Portfolio
            <ArrowUpRight className="w-4 h-4 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
        
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h1>
          <p className="text-lg mb-8 max-w-2xl">
            Explore my portfolio of projects spanning web development, blockchain, AI, and more.
            Each project represents a unique challenge and solution.
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/5 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {project.category.slice(0, 3).map((cat) => (
          <span key={cat} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {cat}
          </span>
        ))}
      </div>
      
      <p className="text-sm mb-4 line-clamp-3">{project.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {project.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="badge text-xs">{tech}</span>
        ))}
        {project.techStack.length > 5 && (
          <span className="badge text-xs">+{project.techStack.length - 5}</span>
        )}
      </div>
      
      <div className="flex gap-2 mt-auto">
        <Link
          href={`/projects/${project.id}`}
          className="flex-1 px-3 py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-1 text-sm font-medium hover:bg-primary/90"
        >
          View Details <ArrowUpRight size={14} />
        </Link>
        
        {project.githubLink && (
          <Link
            href={project.githubLink}
            className="px-3 py-2 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
