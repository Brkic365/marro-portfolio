"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/pages/Services.module.scss";
import Service from "../components/Service";
import { useSearchParams } from "next/navigation";

interface Example {
  name: string;
  model: string;
  imagesDir: string;
  thumbnail: string;
  numImages: number;
  mainColor: string;
  secondaryColor?: string;
  bgColor?: string;
}

interface ServiceType {
  name: string;
  basePath: string;
  background: string;
  examples: Example[];
}

const services: Record<string, ServiceType> = {
  portraits: {
    name: "portraiture",
    basePath: "portraits",
    background: "background.webp",
    examples: [
      {
        name: "nature",
        model: "dorotea",
        imagesDir: "dorotea",
        thumbnail: "1.webp",
        numImages: 7,
        mainColor: "#A27547",
      },
      {
        name: "introspekcija",
        model: "ana kolinger",
        imagesDir: "introspekcija",
        thumbnail: "3.webp",
        numImages: 10,
        mainColor: "#B57974",
        secondaryColor: "#585765"
      },
      {
        name: "nespojivo",
        model: "ivan horvat",
        imagesDir: "nespojivo",
        thumbnail: "8.webp",
        numImages: 15,
        mainColor: "#675722",
        secondaryColor: "#28200D",
      },
      {
        name: "nobru",
        model: "nobru",
        imagesDir: "nobru",
        thumbnail: "2.webp",
        numImages: 12,
        mainColor: "#254B3E"
      },
      {
        name: "no way out",
        model: "ana kolinger",
        imagesDir: "no way out",
        thumbnail: "13.webp",
        numImages: 14,
        mainColor: "#363A15"
      },
      {
        name: "studio",
        model: "ana kolinger",
        imagesDir: "studio",
        thumbnail: "3.webp",
        numImages: 17,
        mainColor: "#9F0007"
      },
      {
        name: "ivana",
        model: "ivana",
        imagesDir: "ivana",
        thumbnail: "8.webp",
        numImages: 8,
        mainColor: "#151515",
        secondaryColor: "#080808",
        bgColor: "black"
      }
    ],
  },
  concerts: {
    name: "concerts",
    basePath: "concerts",
    background: "background.webp",
    examples: [
      {
        name: "lil drito",
        model: "tvornica",
        imagesDir: "lildrito",
        thumbnail: "11.webp",
        numImages: 15,
        mainColor: "#151515",
        secondaryColor: "#080808",
        bgColor: "black"
      },
      {
        name: "lps",
        model: "cvetlicarna",
        imagesDir: "lps",
        thumbnail: "1.webp",
        numImages: 20,
        mainColor: "#015386",
        secondaryColor: "#010201",
        bgColor: "black"
      },
      {
        name: "nobru i matt shaft",
        model: "mocvara",
        imagesDir: "nobru",
        thumbnail: "9.webp",
        numImages: 17,
        mainColor: "#BE5539",
        secondaryColor: "#110C0B",
        bgColor: "black"
      },
      {
        name: "silente",
        model: "zadar",
        imagesDir: "silente",
        thumbnail: "5.webp",
        numImages: 13,
        mainColor: "#0D7497",
        secondaryColor: "#030305",
        bgColor: "black"
      },
    ]
  },  
  familyPhotos: {
    name: "family photos",
    basePath: "familyPhotos",
    background: "background.webp",
    examples: [
      {
        name: "christening",
        model: "eva",
        imagesDir: "krstenje-eva",
        thumbnail: "20.webp",
        numImages: 26,
        mainColor: "#9A8163"
      },
      {
        name: "christening",
        model: "ljupka",
        imagesDir: "krstenje-ljupka",
        thumbnail: "1.webp",
        numImages: 6,
        mainColor: "#9A8163"
      },
      {
        name: "engagement",
        model: "couple",
        imagesDir: "engagement",
        thumbnail: "2.webp",
        numImages: 4,
        mainColor: "#472432",
        secondaryColor: "#8C6F66"
      },
    ]
  }
};

function Services() {
  const searchParams = useSearchParams();
  const serviceSearchParam = searchParams.get("q");

  if (!serviceSearchParam) return null;

  const service = services[serviceSearchParam];

  if (!service) return null;

  return (
    <main className={styles.services} style={{backgroundImage: `url("/images/services/${service.basePath}/${service.background}")`}}>
      <h1>{service.name}</h1>
      <section className={styles.servicesList}>
        {service.examples.map((example, index) => (
          <Service key={index} basePath={service.basePath} service={example} number={index + 1} />
        ))}
      </section>

      <div className={styles.fadeEffect}/>
    </main>
  );
}

export default Services;