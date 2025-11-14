"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Code } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { getFeaturedSkills } from "@/data/skills";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function PageContent({
  experiences,
  projects,
}: {
  experiences: any[];
  projects: any[];
}) {
  const featuredSkills = getFeaturedSkills();
  return (
    <div className="tracking-normal text-base max-w-prose">
      <motion.div
        id="about"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-6 max-sm:mt-12">About</h2>
        <p className="text-base font-medium">
          I’m a developer passionate about crafting accessible, pixel-perfect
          user interfaces that blend thoughtful design with robust engineering.
          My favorite work lies at the intersection of design, AI, and
          development, building experiences that not only look great, but are
          intelligently powered, future-ready, and meticulously engineered for
          performance, usability, and scalability across the modern web and Web3
          ecosystems.
        </p>
        <p className="mt-4 text-base font-medium">
          In my spare time, I’m usually diving into AI research, experimenting
          with on-chain ideas, or watching anime.
        </p>
      </motion.div>

      {/* <motion.div
        id="skills"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-6 mt-36">Tech Stack</h2>
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {featuredSkills.map((skill) => (
              <div 
                key={skill.id}
                className="flex flex-col items-center gap-2 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all group w-24 h-24"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-black/30 rounded-lg p-2 shadow-sm group-hover:scale-110 transition-all">
                  <Image 
                    src={skill.icon || `/icons/code.svg`}
                    alt={skill.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div> */}

      <motion.div
        id="experience"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-6 mt-36">Work Experience</h2>
        <div className="flex flex-col gap-7 ">
          {experiences &&
            experiences.map((experience) => (
              <Link
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-primary/5 rounded-xl hover:p-6 py-6 hover:-mx-6"
              >
                <div className="flex sm:flex-row flex-col items-baseline gap-2 sm:gap-10">
                  <span className="flex-1 text-xs font-semibold text-faint">
                    {experience.date}
                  </span>
                  <div className="max-w-108">
                    <h2 className="text-base font-semibold text-theme flex items-center gap-2">
                      <span className="group-hover:text-primary">
                        {experience.company}
                      </span>
                      <ArrowUpRight className="w-4 h-4 group-hover:text-primary transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </h2>
                    <p className="mt-2 text-sm font-medium">
                      {experience.description}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center mt-4 font-medium">
                      {experience.techStack.map((tech: string) => (
                        <span className="badge" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          <Link 
            href="/experiences"
            className="self-end font-semibold text-primary flex items-center gap-1 group hover:text-primary/80 transition-all mt-4"
          >
            View all experiences
            <ArrowUpRight className="w-4 h-4 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        id="projects"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-6 mt-36">Featured Projects</h2>
        <div className="flex flex-col gap-8">
          {projects &&
            projects.map((project) => (
              <Link
                href={`projects/${project.id}`}
                className=" bg-primary/5 rounded-xl p-3 -mx-4 sm:-mx-6"
              >
                <div className="flex sm:flex-row flex-col items-start gap-2 sm:gap-4">
                  <Image
                    src={project.image}
                    alt="project image"
                    width={100}
                    height={100}
                    className="w-full object-cover rounded-md flex-1"
                  />
                  <div className="max-w-110">
                    <h2 className="text-base font-semibold text-theme flex items-center gap-2">
                      <span className="group-hover:text-primary">
                        {project.title}
                      </span>
                    </h2>
                    <p className="mt-2 text-sm font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center mt-4 max-w-120 font-medium">
                      {project.techStack.map((tech: string) => (
                        <span className="badge" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex mt-4 gap-1  items-center">
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 hover:bg-primary/20 active:bg-primary/20  flex group gap-1 items-center py-1.5 rounded-md text-accent-foreground/80 font-medium text-sm cursor-pointer">
                        Live demo{" "}
                        <ArrowUpRight className="w-4 h-4 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-1.5 px-3 flex gap-1 items-center active:bg-primary/20 rounded-lg font-medium text-sm hover:bg-primary/20 text-primary transition-all duration-300 backdrop-blur-sm border-0"
                      >
                        <Github className="w-4 h-4" /> Source code
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          <Link 
            href="/projects"
            className="self-end font-semibold text-primary flex items-center gap-1 group hover:text-primary/80 transition-all mt-4"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        id="contact"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mt-36">Get in Touch</h2>
        <p className="mt-2 text-base font-medium max-w-110">
          Have a project in mind or want to collaborate? Feel free to reach out!
          I'm always open to discussing new opportunities and innovative ideas.
        </p>
        <ContactForm />
      </motion.div>

      <motion.footer
        className="mt-20 mb-20"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-base font-medium text-faint">
          Loosely designed and coded in <strong>Visual Studio Code</strong> by
          yours truly. Built with <strong>Next.js</strong> and{" "}
          <strong>Tailwind CSS</strong>, deployed with <strong>Vercel</strong>.
          All text is set in the <strong>Inter</strong> typeface.
        </p>
      </motion.footer>
    </div>
  );
}
