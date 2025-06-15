"use client";
import React, { ReactNode } from 'react';
import { motion } from "motion/react";

/**
 *
 * @returns: En component der animere et element ind i viewet.  
 * @example: <AnimateFadeIn />
 * @alias: AnimateFadeIn
 * @summary: Denne komponent bruges til at animere et element ind i viewet.
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/

export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.87, 0, 0.13, 1]
      }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}