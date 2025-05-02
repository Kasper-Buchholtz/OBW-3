'use client'

import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import Heading from '@/components/atoms/Heading'
import Section from '@/components/sections/Section'
import { Button } from '../atoms/Button'

interface HeroProps {
  data?: any
}

const Hero: React.FC<HeroProps> = ({ data, ...props }) => {
  const [currentVideo, setCurrentVideo] = useState<string>(
    data?.content?.[0]?.media?.asset.url || ''
  )

  // Ref to the <video> element
  const videoRef = useRef<HTMLVideoElement>(null)
  // Ref to the container we’ll animate
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Reload and play whenever currentVideo changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.onloadeddata = () => {
        videoRef.current?.play()
      }
    }
  }, [currentVideo])

  /**
   * Fades out the video container, changes the video, then fades it back in.
   */
  const handleSetCurrentVideo = (index: number) => {
    const videoUrl = data?.content?.[index]?.media?.asset.url

    if (!videoUrl || !videoContainerRef.current) return

    // Fade out with clip-path animation
    gsap.to(videoContainerRef.current, {
      duration: 0.5,
      clipPath: 'inset(0% 0% 100% 0%)',
      opacity: 0,
      filter: 'blur(10px)',
      ease: 'expo.in',
      onComplete: () => {
        setCurrentVideo(videoUrl)

        gsap.fromTo(
          videoContainerRef.current,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            duration: 0.7,
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            ease: 'expo.out',
            filter: 'blur(0px)',
          }
        )
      },
    })
  }

  return (
    <Section
      {...props}
      data={data}
      variant="none"
      className="relative h-screen overflow-hidden place-content-center bg-darks-900"
    >
      <Herovideo
        currentVideo={currentVideo}
        videoRef={videoRef}
        videoContainerRef={videoContainerRef}
      />
      <ul className="relative z-10 col-span-full">
        {data?.content?.map((item: any, index: number) => (
          <li
            key={index}
            // Use onMouseEnter or onClick – your preference.
            onMouseEnter={() => handleSetCurrentVideo(index)}
          >
            <Button link={item.link} variant="none" className="text-shadow-0">
              <Heading fontFamily="serif" type="h1">
                {item.link?.label}
              </Heading>
            </Button>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Hero

interface HeroVideoProps {
  currentVideo: string
  videoRef: React.RefObject<HTMLVideoElement>
  videoContainerRef: React.RefObject<HTMLDivElement>
}

/**
 * Simple container for the video. We attach the ref here
 * so GSAP can fade the entire container in/out.
 */

function Herovideo({ currentVideo, videoRef, videoContainerRef }: HeroVideoProps) {

  return (
    <div
      ref={videoContainerRef}
      className="absolute inset-0 opacity-100 bg-darks-900 size-full will-change-[clip-path]"

    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="object-cover object-center w-full h-full"
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
