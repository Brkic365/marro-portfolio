"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import styles from "@/styles/components/Navbar.module.scss";

function Navbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Define pages where navbar is white, so mobile menu background should be #252525
  const whiteNavPages = ["/services", "/concerts"];
  const queries: any = {
      "/portraits": ["7"]
  }

  const queryValue = searchParams.get("q");

  const isWhiteNav = whiteNavPages.includes(pathname) || (queries[pathname] && queries[pathname].includes(queryValue));

  const textColor = isWhiteNav ? "#FFFFFF" : "#252525";
  const bgColor = isWhiteNav ? "black" : "#F2F2F2";

  const [links] = useState([
    { title: "about me", href: "/#about" },
    { title: "my services", href: "/#services" },
    { title: "my projects", href: "/#projects" },
    { title: "contact me", href: "/#contact" },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= lastScrollY) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Suspense>
    <nav className={`${styles.nav} ${showNavbar ? styles.show : styles.hide}`} style={{backgroundColor: lastScrollY > 150 ? bgColor : "transparent"}}>
      <MobileMenu
        open={openMenu}
        links={links}
        setOpen={(open) => setOpenMenu(open)}
      />

      <section
        className={styles.logoHolder}
        onClick={() => router.push("/")}
      >
        <h3 style={{ color: textColor }}>marro</h3>
      </section>

      <ul className={styles.links}>
        {links.map((link) => {
          let active = link.href === "/" ? pathname === link.href : pathname.includes(link.href);
          return (
            <li key={link.href} className={active ? styles.active : styles.unactive}>
              <a href={link.href} style={{ color: textColor }}>{link.title}</a>
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
          variants={{
            open: { transform: "translateY(350%) rotateZ(45deg)" },
            closed: { transform: "translateY(0%) rotateZ(0deg)" },
          }}
          id="line1"
          style={{ backgroundColor: textColor }}
        />
        <div
          className={styles.line}
          style={{ opacity: openMenu ? 0 : 1, backgroundColor: textColor }}
          id="line2"
        />
        <motion.div
          className={styles.line}
          animate={openMenu ? "open" : "closed"}
          transition={{ duration: 0.3, type: "tween" }}
          variants={{
            open: { transform: "translateY(-350%) rotateZ(-45deg)" },
            closed: { transform: "translateY(0%) rotateZ(0deg)" },
          }}
          id="line3"
          style={{ backgroundColor: textColor }}
        />
      </div>
    </nav>
    </Suspense>
  );
}

export default Navbar;
