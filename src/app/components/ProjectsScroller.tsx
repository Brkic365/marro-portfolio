import React from 'react'
import styles from "@/styles/components/ProjectsScroller.module.scss"

import { HiOutlineArrowNarrowRight } from "react-icons/hi";

function ProjectsScroller() {
  return (
    <section className={styles.projectsScroller}>
      <section className={styles.left}>
        <div className={styles.insideImage} />
      </section>
      <section className={styles.right}>
        <section className={styles.top}>
          <ul>
            <li>melankolija</li>
            <li>gospodin savršeni</li>
          </ul>
          <h2>01</h2>
        </section>
        <section className={styles.bottom}>
          <div className={styles.viewMore}>
            <div className={styles.line} />
            <p>view more</p>
            <HiOutlineArrowNarrowRight />
          </div>
          <h1>melankolija</h1>
        </section>
      </section>
    </section>
  )
}

export default ProjectsScroller