import React from 'react'
import styles from "@/styles/components/Footer.module.scss"

import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest } from 'react-icons/io'
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <section className={styles.footer}>
      <section className={styles.left}>
        <IoLogoInstagram />
        <FaXTwitter />
        <IoLogoFacebook />
        <IoLogoPinterest />
      </section>
      <p>© by.marro 2025. All Rights Reserved.</p>
    </section>
  )
}

export default Footer