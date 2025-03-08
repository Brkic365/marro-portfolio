"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/Service.module.scss";
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

const IMAGE_EXTENSION = "webp";

export default function ServicePage({ serviceParam }: {serviceParam: string}) {
  const searchParams = useSearchParams();
  const [serviceProjectIndex, setServiceProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam) {
      setServiceProjectIndex(Number(qParam) - 1);
    }
  }, [searchParams]);

  if (serviceProjectIndex === null) return null;

  const service = services[serviceParam];
  if (!service) return <h1>Service not found</h1>;

  if (serviceProjectIndex < 0 || serviceProjectIndex >= service.examples.length) {
    return <h1>Project not found</h1>;
  }

  const serviceProject = service.examples[serviceProjectIndex];

  // Generate image filenames dynamically
  const images = Array.from({ length: serviceProject.numImages }, (_, i) =>
    `/images/services/${service.basePath}/${serviceProject.imagesDir}/${i + 1}.webp`
  );

  // Distribute images into three columns
  const totalImages = images.length;
  const col2Count = Math.ceil(totalImages / 3);
  const col1Count = Math.floor((totalImages - col2Count) / 2);
  const col3Count = totalImages - col1Count - col2Count;

  const col1 = images.slice(0, col1Count);
  const col2 = images.slice(col1Count, col1Count + col2Count);
  const col3 = images.slice(col1Count + col2Count);

  return (
    <main className={styles.servicePage} style={{ backgroundColor: serviceProject.bgColor || "#F2F2F2" }}>
      <h1
        style={{
          background: `radial-gradient(circle, ${serviceProject.mainColor}, ${
            serviceProject.secondaryColor || "#F7F6F2"
          })`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        {serviceProject.name}
      </h1>
      <section className={styles.imageGallery}>
        <div className={styles.column}>
          {col1.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} loading="lazy" />
          ))}
        </div>
        <div className={styles.column}>
          {col2.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} loading="lazy" />
          ))}
        </div>
        <div className={styles.column}>
          {col3.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} loading="lazy" />
          ))}
        </div>
      </section>
    </main>
  );
};
