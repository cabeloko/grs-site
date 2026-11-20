"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos (para escalonar itens de uma lista). */
  delay?: number;
  as?: "div" | "li";
};

/**
 * Revela o conteúdo ao entrar na tela, uma única vez.
 * Anima apenas opacity e transform. Com prefers-reduced-motion, o
 * MotionConfig desativa o deslocamento e mantém só o fade.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = as === "li" ? m.li : m.div;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Component
          className={className}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
        >
          {children}
        </Component>
      </MotionConfig>
    </LazyMotion>
  );
}
