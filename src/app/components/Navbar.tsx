"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/components/Navbar.module.scss";

import { motion } from "framer-motion";

import MobileMenu from "./MobileMenu";

import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // State that handles opening and closing of the mobile menu
  const [openMenu, setOpenMenu] = useState(false);

  const [links] = useState([
    {
      title: "about me",
      href: "/#about",
    },
    {
      title: "my services",
      href: "/#services",
    },
    {
      title: "my projects",
      href: "/#projects",
    },
    {
      title: "contact me",
      href: "/#contact",
    },
  ]);

  // Values asigned to the top line of the hamburger menu used for rotation
  const topLineVariants = {
    open: { transform: "translateY(350%) rotateZ(45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  // Values asigned to the bottom line of the hamburger menu used for rotation
  const bottomLineVariants = {
    open: { transform: "translateY(-350%) rotateZ(-45deg)" },
    closed: { transform: "translateY(0%) rotateZ(0deg)" },
  };

  return (
    <nav className={styles.nav}>
      <MobileMenu
        open={openMenu}
        links={links}
        setOpen={(open: any) => setOpenMenu(open)}
      />

      <section className={styles.logoHolder} onClick={() => router.push("/")}>
        <h3>
          marro
        </h3>
      </section>

      {/* Navbar links */}
      <ul className={styles.links}>
        {links.map((link) => {
          // Check if the link is active
          let active =
            link.href === "/"
              ? pathname === link.href
              : pathname.includes(link.href);

          return (
            <li
              key={link.href}
              className={active ? styles.active : styles.unactive}
            >
              <a href={link.href}>{link.title}</a>
            </li>
          );
        })}
      </ul>

      <div
        className={openMenu ? styles.closeHamburger : styles.hamburger}
        onClick={() => setOpenMenu(!openMenu)}
        id="hamburger"
      >
        <motion.div
          className={styles.line}
          animate={openMenu ? "open" : "closed"}
          transition={{ duration: 0.3, type: "tween" }}
          variants={topLineVariants}
          id="line1"
        />
        <div
          className={styles.line}
          style={openMenu ? { opacity: 0 } : undefined}
          id="line2"
        />
        <motion.div
          className={styles.line}
          animate={openMenu ? "open" : "closed"}
          transition={{ duration: 0.3, type: "tween" }}
          variants={bottomLineVariants}
          id="line3"
        />
      </div>
    </nav>
  );
}

export default Navbar;
