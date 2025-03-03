"use client"

import React, { useState, useRef } from 'react'
import styles from "@/styles/components/3DCarousel.module.scss"

function ThreeDCarousel() {

    const images = [
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ]

    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200; // Fallback for SSR
    const translateZ = (screenWidth / 2) / Math.tan(Math.PI / images.length);

    return (
        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            {images.map((src, index) => (
              <div
                key={index}
                className={styles.carouselItem}
                style={{
                  transform: `rotateY(${index * (360 / images.length)}deg) translateZ(${400}px) rotateY(180deg)`, // Adjust translateZ for curvature
                }}
              >
                <img src={src} alt={`Carousel Image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      );
}

export default ThreeDCarousel