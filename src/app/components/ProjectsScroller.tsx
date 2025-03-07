import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import styles from "@/styles/components/ProjectsScroller.module.scss"

// Sample project data - replace with your actual projects
const projects = [
  { 
    title: "Melankolija", 
    img: "/images/projects/melankolija/thumb.webp" 
  },
  { 
    title: "Gospodin Savršeni", 
    img: "/images/projects/gospodin/thumb.webp"
  },
];

export function ProjectsScroller() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for up, 1 for down
  const prevScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll lock and unlock
  useEffect(() => {
    const checkScrollLock = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      // Lock when section is fully visible or when top edge is just at viewport top
      if ((isFullyVisible || (rect.top <= 0 && rect.top > -20)) && !isLocked) {
        setIsLocked(true);
        prevScrollY.current = window.scrollY;
        
        // Freeze page scrolling
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${prevScrollY.current}px`;
        document.body.style.width = "100%";
      } 
      // Unlock when section is no longer visible
      else if (!isVisible && isLocked) {
        setIsLocked(false);
        unlockScroll();
      }
    };

    const unlockScroll = () => {
      document.body.style.overflow = "scroll";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // window.scrollTo(0, prevScrollY.current);
    };

    window.addEventListener("scroll", checkScrollLock);
    checkScrollLock(); // Initial check
    
    return () => {
      if (isLocked) unlockScroll();
      window.removeEventListener("scroll", checkScrollLock);
    };
  }, [isLocked]);

  // Handle wheel events to navigate between projects
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isLocked) return;
      
      e.preventDefault();
      
      // Determine scroll direction with some debounce
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      scrollTimeout.current = setTimeout(() => {
        const newDirection = e.deltaY > 0 ? 1 : -1;
        setDirection(newDirection);
        
        const newIndex = activeIndex + newDirection;
        
        // If we're at the end, unlock scrolling to continue
        if (newIndex < 0 || newIndex >= projects.length) {
          setIsLocked(false);
          
          // Restore scrolling without jumping
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.width = "";
          
          // Set the correct scroll position before continuing
          if (newIndex < 0) {
            // Scrolling upward past first project
            window.scrollBy(0, prevScrollY.current - 50);
          } else {
            // Scrolling downward past last project
            window.scrollBy(0, prevScrollY.current + 50);
          }
          return;
        }
        
        // Otherwise, update the active project
        setActiveIndex(newIndex);
      }, 150); // Debounce time
    };
    
    const sectionElement = sectionRef.current;
    if (sectionElement && isLocked) {
      sectionElement.addEventListener("wheel", handleWheel, { passive: false });
    }
    
    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener("wheel", handleWheel);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isLocked, activeIndex]);

  // Handle manual project selection
  const handleProjectClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section 
      ref={sectionRef} 
      className={styles.projectsScroller}
      id="projects"
    >
      {/* Left side - Images */}
      <section className={styles.left}>
        <div 
          className={styles.insideImages}
          style={{
            transform: `translateY(${-activeIndex * 100}vh)`
          }}
        >
          {projects.map((project, index) => (
            <div
              key={`image-${index}`}
              className={styles.insideImage}
              style={{ 
                backgroundImage: `url(${project.img})`,
                position: "relative"
              }}
            >
              <div className={styles.overlay} style={{
                opacity: activeIndex === index ? 0 : 0.7
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* Right side - Information */}
      <section className={styles.right}>
        {/* Top section - Project navigation */}
        <div className={styles.top}>
          <ul>
            {projects.map((project, index) => (
              <li 
                key={`nav-${index}`}
                onClick={() => handleProjectClick(index)}
                className={activeIndex === index ? "active" : ""}
              >
                {project.title}
              </li>
            ))}
          </ul>
          <h2>{String(activeIndex + 1).padStart(2, '0')}</h2>
        </div>

        {/* Bottom section - Project details */}
        <div className={styles.bottom}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.viewMore}>
                <div className={styles.line} />
                <p>view more</p>
                <HiOutlineArrowNarrowRight className={styles.icon} />
              </div>
              
              <h1>{projects[activeIndex].title}</h1>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </section>
  );
}

export default ProjectsScroller;
