"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function SharedHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  // Don't render header on home page
  if (isHomePage) {
    return null;
  }
  
  return null; // Temporarily disable shared header to avoid duplicate headers
}
