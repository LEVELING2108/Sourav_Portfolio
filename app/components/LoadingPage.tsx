"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderGlitchText } from "@/components/ui/loader-glitch-text";

export default function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("LOADING");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Switch from LOADING to SOURAV SUMAN in between the glitch effect
    const nameTimer = setTimeout(() => {
      setText("SOURAV SUMAN");
    }, 1400);

    // Smoothly exit after showing the name
    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 3000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearTimeout(nameTimer);
        clearTimeout(exitTimer);
        setIsLoading(false);
        document.body.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(exitTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-page"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex w-full items-center justify-center bg-background select-none"
        >
          <LoaderGlitchText
            text={text}
            intensity="medium"
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider sm:tracking-widest text-foreground text-center px-4 max-w-full break-words"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
