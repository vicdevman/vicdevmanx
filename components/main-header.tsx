"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MainHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  // Don't render header on home page
  if (isHomePage) {
    return null;
  }
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-theme/80 backdrop-blur-md border-b border-primary/10 py-4"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full">
            <Image
              src="/vicdevman.jpg"
              alt="Victor Adeiza"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-base font-bold">Victor Adeiza</h3>
            <p className="text-xs text-primary">Full-Stack AI Engineer</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link 
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/projects"
            className={`text-sm font-medium transition-colors ${pathname.startsWith('/projects') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            Projects
          </Link>
          <Link 
            href="/experiences"
            className={`text-sm font-medium transition-colors ${pathname.startsWith('/experiences') ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            Experience
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
