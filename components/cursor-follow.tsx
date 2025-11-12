'use client'

import { useMotionValue, useSpring } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CursorFollow() {
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
        };
    
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
      }, [cursorX, cursorY]);

      return (
        <motion.div 
          className="fixed top-0 max-sm:left-1/2 w-full h-full pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="sm:absolute w-96 h-96 max-sm:bg-primary/20 bg-primary/10 rounded-full blur-3xl"
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
              x: "-50%",
              y: "-50%"
            }}
          />
          <div className="absolute top-20 right-20 w-80 h-80 bg-secondary-color/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent-color/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </motion.div>
      );
}
