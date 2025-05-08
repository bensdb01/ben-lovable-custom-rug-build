
import React from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  type?: "fade" | "slide-left" | "slide-right" | "zoom";
}

// Simplified ScrollAnimation component that just renders children
// This is a placeholder to maintain compatibility with RugBuilder
const ScrollAnimation = ({ children }: ScrollAnimationProps) => {
  // Simply render the children without animations
  return <>{children}</>;
};

export default ScrollAnimation;
