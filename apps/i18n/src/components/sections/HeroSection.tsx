'use client'
import React, { useState, useRef, useEffect } from 'react'
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

  // Whenever currentVideo changes, reload & play
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [currentVideo])

  const handleSetCurrentVideo = (index: number) => {
    const videoUrl = data?.content?.[index]?.media?.asset.url
    if (videoUrl) setCurrentVideo(videoUrl)
  }

  return (
    <Section
      {...props}
      data={data}
      variant='none'
      className="relative h-screen overflow-hidden place-content-center"
    >
      <Herovideo currentVideo={currentVideo} videoRef={videoRef} />
      <ul className="relative z-10 col-span-full">
        {data?.content?.map((item: any, index: number) => (
          <li key={index} onMouseEnter={() => handleSetCurrentVideo(index)}>
            <Button link={item.link} variant="none" className=' text-shadow-0'>
            <Heading fontFamily='serif' type='h1'>{item.link?.label}</Heading>
            </Button>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Hero



function Herovideo({ currentVideo, videoRef }) {
  return (
    <div className="absolute inset-0 size-full">
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