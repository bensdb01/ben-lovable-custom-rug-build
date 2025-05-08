
import { useEffect, useRef } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  type?: "fade" | "slide-left" | "slide-right" | "zoom";
}

const ScrollAnimation = ({ children, delay = 0, type = "fade" }: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    switch (type) {
      case "slide-left":
        return "reveal-slide-left";
      case "slide-right":
        return "reveal-slide-right";
      case "zoom":
        return "reveal-zoom";
      case "fade":
      default:
        return "reveal";
    }
  };

  return (
    <div 
      ref={elementRef} 
      className={getAnimationClass()} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
