'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useVideoTime } from './VideoTimeContext'

const ProjectTitle = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { getTime } = useVideoTime()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoaded = () => {
      const savedTime = getTime(data._id) || 0
      console.log('🟢 Loaded metadata. Using savedTime:', savedTime)

      try {
        video.currentTime = savedTime
        console.log('⏱ AFTER setting currentTime =', video.currentTime)

        requestAnimationFrame(() => {
          video
            .play()
            .then(() => console.log('▶️ Video playing'))
            .catch((err) => {
              if (err.name !== 'AbortError') {
                console.warn('ProjectTitle video.play() failed', err)
              }
            })
        })
      } catch (err) {
        console.warn('ProjectTitle: setting currentTime failed', err)
      }
    }

    video.addEventListener('loadedmetadata', handleLoaded)

    console.log('📦 video.src =', video.src)
    console.log('⏱ currentTime right after setting =', video.currentTime)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoaded)
    }
  }, [data._id, getTime])

  return (
    <motion.div layoutId={data._id}>
      <video
        loop
        autoPlay
        muted
        playsInline
        ref={videoRef}
        src={data?.video?.asset?.url}
      />
    </motion.div>
  )
}

export default ProjectTitle
