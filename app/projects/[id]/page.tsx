"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Layers,
  Code,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Project, getProjectById } from "@/data/projects";
import CursorFollow from "@/components/cursor-follow";
import FloatingNav from "@/components/floating-nav";
import { notFound } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setParamSId] = useState("");

  async function resolveParams() {
    const param = await params;
    setParamSId(param.id);
  }

useEffect(() => {
  resolveParams()
},[params])

  useEffect(() => {
    if (id) {
      const foundProject = getProjectById(id);

      if (foundProject) {
        setProject(foundProject);
      } else {
        setError("Project not found");
      }

      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-theme min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-primary" />
          <p className="text-lg font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    notFound();
  }

  return (
    <div className="bg-theme min-h-screen flex flex-col items-center">
      <FloatingNav />
      <CursorFollow />

      <main className="w-full max-w-5xl mx-auto p-6 sm:p-8 mt-16">
        <div className="flex items-center mb-8">
          <Link
            href="/projects"
            className="group flex items-center gap-2 text-primary hover:underline transition-all"
          >
            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span>Back to Projects</span>
          </Link>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.category.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs bg-primary/20 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/10"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-primary text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <ExternalLink size={16} />
                Live Demo
              </Link>
            )}

            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-primary/10 text-primary rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-primary/20 transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                <Github size={16} />
                View Source
              </Link>
            )}

            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-primary/10 text-primary rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-primary/20 transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                <ExternalLink size={16} />
                Visit Website
              </Link>
            )}
          </div>

          {/* Project Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold">Completed</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.completionDate}
              </p>
            </div>

            {project.role && (
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Layers size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">My Role</h3>
                </div>
                <p className="text-sm text-muted-foreground">{project.role}</p>
              </div>
            )}

            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Code size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold">Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-primary/10 pt-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Explore More Projects
            </h2>
            <Link
              href="/projects"
              className="px-5 py-3 bg-primary/10 text-primary rounded-xl inline-flex items-center gap-2 text-sm font-medium hover:bg-primary/20 transition-all"
            >
              View All Projects
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
