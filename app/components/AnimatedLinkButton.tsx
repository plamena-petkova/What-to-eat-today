import Link from 'next/link';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface AnimatedLinkButtonProps extends MotionProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  newTab: boolean;
}

export default function AnimatedLinkButton({
  href,
  children,
  className = '',
  newTab = false,
  initial = { opacity: 0, y: 10 },
  animate = { opacity: 1, y: 0 },
  transition = { delay: 0.4 },
  ...motionProps
}: AnimatedLinkButtonProps) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={`text-center mt-6 ${className}`}
      {...motionProps}
    >
      <Link
        href={href}
        target={newTab ? '_blank' : '_self'}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold text-lg rounded-xl shadow-md hover:brightness-110 transition-all duration-200">
          {children}
        </button>
      </Link>
    </motion.div>
  );
}
