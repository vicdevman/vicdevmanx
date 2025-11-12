"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import ContactForm from "@/components/contact-form";

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
          My favorite work lies at the intersection of design and development,
          creating experiences that not only look great but are meticulously
          built for performance and usability.
        </p>
        <p className="mt-4 text-base font-medium">
          In my spare time, I’m usually climbing, playing tennis, hanging out
          with my wife and two cats, or running around Hyrule searching for
          Korok seeds
        </p>
      </motion.div>

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
                href={project.link}
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
                      <button className="px-3 hover:bg-primary/20 active:bg-primary/20  flex group gap-1 items-center py-1.5 rounded-md text-accent-foreground/80 font-medium text-sm cursor-pointer">
                      Live demo  <ArrowUpRight className="w-4 h-4 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </button>
                          <Link
                            href="#github"
                            className="py-1.5 px-3 flex gap-1 items-center active:bg-primary/20 rounded-lg font-medium text-sm hover:bg-primary/20 text-primary transition-all duration-300 backdrop-blur-sm border-0"
                          >
                            <Github className="w-4 h-4" /> Source code
                          </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
