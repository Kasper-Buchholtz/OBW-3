'use client'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

type ContextType = {
  getTime: (id: string) => number
  setTime: (id: string, time: number) => void
}

const VideoTimeContext = createContext<ContextType>({
  getTime: () => 0,
  setTime: () => {},
})

export const useVideoTime = () => useContext(VideoTimeContext)

export const VideoTimeProvider = ({ children }: { children: any }) => {
  const [videoTimes, setVideoTimes] = useState<{ [id: string]: number }>({})

  const getTime = (id: string) => videoTimes[id] || 0

  const setTime = (id: string, time: number) => {
    setVideoTimes((prev) => ({ ...prev, [id]: time }))
  }

  return (
    <VideoTimeContext.Provider value={{ getTime, setTime }}>
      {children}
    </VideoTimeContext.Provider>
  )
}
