"use client"

import React from 'react'
import styles from "@/styles/components/Service.module.scss"
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

import { useRouter } from 'next/navigation'

function Service({basePath, service, number}: {basePath: string, service: any, number: number}) {

  const router = useRouter();

  return (
    <section className={styles.service} style={{flexDirection: number % 2 == 0 ? "row-reverse": "row", marginLeft: number % 2 == 0 ? "auto": "0"}}
              onClick={() => router.push(`/${basePath}?q=${number}`)}>
        <section className={styles.card}>
          <div className={styles.image} style={{background: `url("/images/services/${basePath}/${service.imagesDir}/${service.thumbnail}")`}} />
          <section className={styles.details}>
            <section className={styles.left}>
              <h4>{service.name}</h4>
              <p>{service.model}</p>
            </section>
            <HiOutlineArrowNarrowRight />
          </section>
        </section>
        <h2>{number < 10 && "0"}{number}</h2>
    </section>
  )
}

export default Service