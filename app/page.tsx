import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Instagram, Linkedin, LucideTwitter, Send, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import PageContent from "@/components/page-content";
import { ThemeToggle } from "@/components/theme-toggle";
import CursorFollow from "@/components/cursor-follow";
import FloatingNav from "@/components/floating-nav";
import Chatbot from "@/components/chatbot";
import { experiences } from "@/data/experiences";
import { projects, getFeaturedProjects } from "@/data/projects";

export default function App() {
  return (
    <div className="bg-theme min-h-screen flex flex-col items-center">
      <FloatingNav />
      <CursorFollow />
      {/* <ThemeToggle /> */}
      <Chatbot/>
      {/* <div className="bg-linear-r from-primary to-secondary-color w-full h-30 sm:h-40 lg:hidden  absolute z-1"></div> */}
      <main className="grid grid-cols-[1fr_1.05fr] mt-8 z-2 justify-center max-lg:grid-cols-1 max-lg:gap-8 max-w-310 mx-auto p-6 sm:p-8">
        <div className="lg:sticky top-36 sm:mt-10 mt-8 self-start flex flex-col justify-between">
          <div className="bg-primary w-[80%] h-30 -mt-18 -ml-6 rounded-2xl lg:block hidden  absolute z-1"></div>
          <Image
            width={150}
            height={150}
            src="/vicdevman.jpg"
            alt="vicdevman avatar"
            className="object-cover w-18 h-18  rounded-2xl overflow-hidden z-2"
          />
          <h1 className="sm:text-4xl mt-6"> Victor Adeiza</h1>
          <p className="sm:mt-2 mt-0 text-md sm:text-lg font-medium text-primary">
            {"<Full-Stack AI Engineer/>"}
          </p>
          <p className="font-medium text-base mt-6">
            I engineer accessible, intelligent <br /> experiences
            for the web • AI • Web3 
          </p>

          <span className="mt-10 sm:mt-16 flex gap-4 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}> */}
                <Link
                  href="#twitter"
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 inline-block backdrop-blur-sm border border-primary/20"
                >
                  <LucideTwitter size={20} />
                </Link>
                {/* </motion.div> */}
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow on Twitter</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                {/* <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}> */}
                <Link
                  href="#linkedin"
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 inline-block backdrop-blur-sm border border-primary/20"
                >
                  <Linkedin size={20} />
                </Link>
                {/* </motion.div> */}
              </TooltipTrigger>
              <TooltipContent>
                <p>Connect on LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                {/* <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}> */}
                <Link
                  href="#github"
                  className="p-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 inline-block backdrop-blur-sm border border-primary/20"
                >
                  <Github size={20} />
                </Link>
                {/* </motion.div> */}
              </TooltipTrigger>
              <TooltipContent>
                <p>View GitHub Profile</p>
              </TooltipContent>
            </Tooltip>

            <button className="px-6 py-3 rounded-xl bg-(--primary-color) text-[#e2e8f0] font-medium text-sm cursor-pointer">
              Resume
            </button>
          </span>
        </div>
        <PageContent experiences={experiences} projects={getFeaturedProjects()} />
      </main>
    </div>
  );
}
