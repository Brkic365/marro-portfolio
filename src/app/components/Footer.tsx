"use client"

import React from 'react';
import styles from "@/styles/components/Footer.module.scss";
import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest } from 'react-icons/io';
import { FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  // Define pages where the footer is visible and its color scheme
  const visiblePages = ["/"];
  const isVisible = visiblePages.includes(pathname);
  
  // Define text and icon color based on page
  const isWhiteFooter = [""].includes(pathname);
  const textColor = isWhiteFooter ? "#FFFFFF" : "#252525";

  if (!isVisible) return null;

  return (
    <section className={styles.footer} style={{ color: textColor }}>
      <section className={styles.left}>
        <IoLogoInstagram style={{ color: textColor }} />
        <FaXTwitter style={{ color: textColor }} />
        <IoLogoFacebook style={{ color: textColor }} />
        <IoLogoPinterest style={{ color: textColor }} />
      </section>
      <p>© marro 2025. All Rights Reserved.</p>
    </section>
  );
}

export default Footer;