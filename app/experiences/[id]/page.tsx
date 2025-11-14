"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Code,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Experience, getExperienceById } from "@/data/experiences";
import CursorFollow from "@/components/cursor-follow";
import FloatingNav from "@/components/floating-nav";
import MainHeader from "@/components/main-header";
import { notFound, useRouter } from "next/navigation";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setParamId] = useState("");

  async function resolveParams() {
    const param = await params;
    setParamId(param.id);
  }

  useEffect(() => {
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const foundExperience = getExperienceById(id);
      
      if (foundExperience) {
        setExperience(foundExperience);
      } else {
        setError("Experience not found");
      }
      
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-theme min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-primary" />
          <p className="text-lg font-medium">Loading experience details...</p>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    notFound();
  }

  const router = useRouter();

  return (
    <div className="bg-theme min-h-screen flex flex-col items-center">
      {/* <MainHeader /> */}
      <CursorFollow />

      <main className="w-full max-w-5xl mx-auto p-6 sm:p-8 mt-24">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-primary hover:underline transition-all"
          >
            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span>Back</span>
          </button>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4 text-xs font-medium text-primary">
                  <Calendar size={14} />
                  {experience.date}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {experience.company}
                </h1>
                <p className="text-xl text-primary">{experience.title}</p>

                {experience.location && (
                  <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
                    <MapPin size={16} />
                    <span>{experience.location}</span>
                  </div>
                )}
              </div>

              <Link
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-primary text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                <ExternalLink size={16} />
                Visit Company
              </Link>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold">Position</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {experience.title}
              </p>
            </div>

            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 hover:border-primary/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold">Duration</h3>
              </div>
              <p className="text-sm text-muted-foreground">{experience.date}</p>
            </div>

            {experience.location && (
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">Location</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {experience.location}
                </p>
              </div>
            )}
          </div>

          {/* Role Description */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-4">Role Overview</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                {experience.longDescription || experience.description}
              </p>
            </div>
          </div>

          {/* Achievements */}
          {experience.achievements && (
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Award size={18} className="text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Key Achievements</h2>
              </div>

              <div className="space-y-3 mt-4">
                {experience.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all"
                  >
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Code size={18} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Technologies & Skills</h2>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Areas of Focus */}
          {experience.category && (
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h2 className="text-xl font-semibold mb-4">Areas of Focus</h2>
              <div className="flex flex-wrap gap-2">
                {experience.category.map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm hover:bg-primary/20 transition-all cursor-default"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-primary/10 pt-8 mt-8">
            <h2 className="text-xl font-semibold mb-4">Explore More</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/experiences"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-primary/10 text-primary rounded-xl inline-flex items-center gap-2 text-sm font-medium hover:bg-primary/20 transition-all"
              >
                All Experiences
              </Link>
              <Link
                href="/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-primary/10 text-primary rounded-xl inline-flex items-center gap-2 text-sm font-medium hover:bg-primary/20 transition-all"
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
