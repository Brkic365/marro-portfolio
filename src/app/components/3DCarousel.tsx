import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import styles from "@/styles/components/3DCarousel.module.scss"
import AutoScroll from 'embla-carousel-auto-scroll'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const images = ["/images/services/concerts/lildrito/1.webp", 
  "/images/services/concerts/lildrito/2.webp", 
  "/images/services/concerts/lildrito/3.webp", 
  "/images/services/concerts/lildrito/4.webp", 
  "/images/services/concerts/lildrito/5.webp", 
  "/images/services/concerts/lildrito/6.webp", 
  "/images/services/concerts/lildrito/7.webp",
  "/images/services/concerts/lildrito/8.webp",
  "/images/services/concerts/lildrito/9.webp",
  "/images/services/concerts/lildrito/10.webp",
]

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({})
  ])

  return (
    <section className={styles.embla}>
      <div className={styles.topElipse} />
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <div style={{backgroundImage: `url("${images[index]}")`}} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomElipse} />
    </section>
  )
}

export default EmblaCarousel;