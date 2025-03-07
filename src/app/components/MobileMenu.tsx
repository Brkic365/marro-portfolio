/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "@/styles/components/MobileMenu.module.scss";

type LinkType = {
  title: string;
  href: string;
};

interface MenuProps {
  open: boolean;
  links: Array<LinkType>;
  setOpen: (open: boolean) => void;
}

function MobileMenu(props: MenuProps) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [animationFinished, setAnimationFinished] = useState(false);

  // Define pages where navbar is white, so mobile menu background should be #252525
  const whiteNavPages = ["/services", "/concerts"];
  const queries: any = {
      "/portraits": ["7"]
  }

  const queryValue = searchParams.get("q");

  const isWhiteNav = whiteNavPages.includes(pathname) || (queries[pathname] && queries[pathname].includes(queryValue));

  const backgroundColor = isWhiteNav ? "#252525" : "#FFFFFF";
  const textColor = isWhiteNav ? "#FFFFFF" : "#252525";

  const menuVariants = {
    open: { opacity: 1, height: "100%", display: "flex" },
    closed: { opacity: 0.5, height: "0%", display: "flex" },
  };

  const containerVariants = {
    open: { opacity: 1, display: "flex" },
    closing: { opacity: 0, display: "flex" },
    finished: { opacity: 0, display: "none" },
  };

  useEffect(() => {
    if (!props.open) {
      document.body.style.overflowY = "unset";
      const timeout = setTimeout(() => {
        setAnimationFinished(true);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      document.body.style.overflowY = "hidden";
      setAnimationFinished(false);
    }
  }, [props.open]);

  useEffect(() => {
    if (props.open) {
      props.setOpen(false);
    }
  }, [pathname]);

  return (
    <motion.main
      animate={props.open ? "open" : animationFinished ? "finished" : "closing"}
      transition={{ duration: 0.3, type: "tween" }}
      variants={containerVariants}
      className={styles.container}
    >
      <motion.section
        animate={props.open ? "open" : "closed"}
        transition={{ duration: 0.2, type: "tween" }}
        variants={menuVariants}
        className={styles.menu}
        style={{ backgroundColor }}
      >
        <ul>
          {props.links.map((link, i) => (
            <li key={i} onClick={() => props.setOpen(false)}>
              <Link href={link.href} style={{ color: textColor }}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.main>
  );
}

export default MobileMenu;