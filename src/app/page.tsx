"use client"

import Image from "next/image";
import styles from "@/styles/pages/Home.module.scss";
import { EmblaOptionsType } from 'embla-carousel'

import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { HiArrowUpRight, HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { IoLogoInstagram } from "react-icons/io";

import ProjectsScroller from "./components/ProjectsScroller";
import ProjectsList from "./components/ProjectsList";

import { useRouter } from "next/navigation";

import EmblaCarousel from "./components/3DCarousel"

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 7
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {

  const router = useRouter();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        <p className={styles.date}>Zagreb, 11:32 PM</p>
        <section className={styles.info}>
          <p>Student photographer from Zagreb, Croatia 
          who specializes in B/W photography</p>
          <section className={styles.personal}>
            <h4>marija kolovrat</h4>
            <p>studentica fotografije</p>
          </section>
        </section>
      </section>
      <section className={styles.about} id="about">
        <div className={styles.circle} />
        <h1>about me</h1>
        <section className={styles.content}>
          <div className={styles.text}>
            <p className={styles.p1}>A student photographer from Zagreb, Croatia, I specialize in black-and-white photography, capturing raw emotions and the beauty of light and shadow. Through my lens, I strive to tell meaningful stories and uncover the details often overlooked.</p>
            <p className={styles.p2}>Photography and art have been my passion since childhood, shaping how I see the world. Whether exploring the streets of Zagreb.</p>
            <button><p>View my projects</p><HiOutlineArrowNarrowRight /></button>
          </div>
          <div className={styles.image} />
          <h5>est 2002</h5>
        </section>
      </section>
      <section className={styles.services} id="services">
        <section className={styles.left}>
          <h2>my services</h2>
          <p>Whether {"it’s"} capturing the essence of
            a corporate event, immortalizing a {"couple’s "}
            special day, or collaborating on artistic projects.</p>
        </section>
        <section className={styles.right}>
          <div className={styles.service} onClick={() => router.push("/services?q=portraits")}>
            <h3>portraiture</h3>
            <HiArrowUpRight />
          </div>
          <div className={styles.service} onClick={() => router.push("/services?q=concerts")}>
            <h3>concerts</h3>
            <HiArrowUpRight />
          </div>
          <div className={styles.service} onClick={() => router.push("/services?q=familyPhotos")}>
            <h3>family photos</h3>
            <HiArrowUpRight />
          </div>
        </section>
      </section>
      <ProjectsList />
      <section className={styles.contact} id="contact">
        <div className={styles.circle} />
        <section className={styles.title}>
          <h1 className={styles.mainTitle}>
            contact me
          </h1>
          <h1 className={styles.bgTopTitle}>{"let's"}</h1>
          <h1 className={styles.bgBottomTitle}>{"work"}</h1>
        </section>
        <section className={styles.contactForm}>
          <section className={styles.contactInfo}>
            <div>
              <HiOutlineEnvelope />
              <p>booking@marro.com</p>
            </div>
            <div>
              <HiOutlinePhone />
              <p>+385 97 675 7675</p>
            </div>
            <div>
              <IoLogoInstagram />
              <p>@by.marro</p>
            </div>
          </section>
          <form>
            <section className={styles.twoInput}>
              <input placeholder="Name" />
              <input placeholder="Email" />
            </section>
            <textarea placeholder="Message" rows={7} />
            <button>
              <p>Submit</p>
              <HiArrowUpRight />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
