"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed sm:top-6  top-2 right-6 z-50 p-3 rounded-xl bg-primary/10 backdrop-blur-lg border border-primary/20 hover:bg-primary/20 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Moon className="w-5.6 h-5.6 text-primary" />
        ) : (
          <Sun className="w-5.6 h-5.6 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
}
