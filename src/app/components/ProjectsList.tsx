import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import styles from "@/styles/components/ProjectsList.module.scss"

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

export function ProjectsList() {
  return (
    <section 
      className={styles.projectsScroller}
      id="projects"
    >
        {
            projects.map((project, i) => {
                return (<div  className={styles.projectHolder}>
                    {/* Left side - Images */}
      <section className={styles.left}>
        <div 
          className={styles.insideImages}
          style={{
            transform: `translateY(${-i * 100}vh)`
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
                opacity: 0.7
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
                className={"active"}
              >
                {project.title}
              </li>
            ))}
          </ul>
          <h2>{String(i + 1).padStart(2, '0')}</h2>
        </div>

        {/* Bottom section - Project details */}
        <div className={styles.bottom}>
            <div
              key={`details-${i}`}
            >
              <div className={styles.viewMore}>
                <div className={styles.line} />
                <p>view more</p>
                <HiOutlineArrowNarrowRight className={styles.icon} />
              </div>
              
              <h1>{projects[i].title}</h1>
            </div>
        </div>
        </section>
        </div>
        )})
        }

    </section>
  );
}

export default ProjectsList;
