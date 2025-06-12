'use client'
import React, { useState } from 'react'
import Heading from '@/components/atoms/Heading'
import Media from '@/components/organisms/Media'
import Section from '@/components/sections/Section'
import TextSplit from '../interactions/SplitText'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { media } from 'sanity-plugin-media'

/**
 *
 * @returns: En sektion med en hero.
 * @example: <Hero2 />
 * @alias: Hero2
 * @summary: Denne komponent bruges til at vise en hero.
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

interface HeroProps {
  data?: any
}

const Hero2: React.FC<HeroProps> = ({ data, ...props }) => {
  const MediaRef = React.useRef(null)
  // animate media scaling with gsap
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: MediaRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    tl.fromTo(
      MediaRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 1, ease: 'expo.inOut' }
    )
    return () => {
      tl.kill()
    }
  }, { scope: MediaRef })
  return (
    <>
      <Section
        {...props}
        className="h-screen relative pt-40 md:pt-30"
        paddingTop="none"
        paddingBottom="none"
      >
        <div className='absolute inset-0 h-screen size-full ' ref={MediaRef}>
          <Media data={data?.MediaObject?.media} />
        </div>
        <div className=" absolute z-20 w-full px-4 flex items-end h-screen bottom-0 left-0 text-superego-light-base px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52">
          <Heading spacing="small" tag="h1" type="h1">
            <span className='leading-none overflow-hidden'>
              <div
                className="text-center opacity-0 translate-y-full group-hover:opacity-100 duration-500 group-hover:translate-y-0 transition-all ease-expo-in-out"
              >
                {data.title}
              </div>
            </span>
          </Heading>
        </div>
      </Section>
    </>
  )
}

export default Hero2
