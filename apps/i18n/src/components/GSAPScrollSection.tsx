'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AutoScrollWrapperProps {
    children: React.ReactNode
    delay?: number // Delay before starting scroll (in seconds)
    duration?: number // Duration of scroll animation (in seconds)
    ease?: string // GSAP easing function
    trigger?: 'immediate' | 'pageLoad' | 'custom' // When to trigger the scroll
    onScrollComplete?: () => void // Callback when scroll completes
}

/**
 * AutoScrollWrapper - Automatically scrolls down 100vh using GSAP and Lenis
 * 
 * @param children - The content to wrap (typically PageContainer)
 * @param delay - Delay before starting scroll (default: 1 second)
 * @param duration - Duration of scroll animation (default: 2 seconds)
 * @param ease - GSAP easing function (default: 'power2.out')
 * @param trigger - When to trigger the scroll (default: 'pageLoad')
 * @param onScrollComplete - Callback when scroll completes
 */
export default function AutoScrollWrapper({
    children,
    delay = 1,
    duration = 2,
    ease = 'power2.out',
    trigger = 'pageLoad',
    onScrollComplete,
}: AutoScrollWrapperProps) {
    const hasScrolled = useRef(false)

    const executeScroll = () => {
        if (hasScrolled.current) return
        hasScrolled.current = true

        // Get the current scroll position
        const currentScroll = window.scrollY || document.documentElement.scrollTop
        const targetScroll = currentScroll + window.innerHeight

        // Use GSAP to animate the scroll
        gsap.to(window, {
            scrollTo: targetScroll,
            duration: duration,
            ease: ease,
            onComplete: () => {
                onScrollComplete?.()
            }
        })
    }

    useEffect(() => {
        if (trigger === 'immediate') {
            setTimeout(executeScroll, delay * 1000)
        } else if (trigger === 'pageLoad') {
            const timer = setTimeout(() => {
                executeScroll()
            }, delay * 1000)

            return () => clearTimeout(timer)
        }
    }, [delay, duration, ease, trigger, onScrollComplete])

    // Expose method for custom triggering
    useEffect(() => {
        if (trigger === 'custom') {
            // Attach method to window for external access
            ; (window as any).triggerAutoScroll = executeScroll

            return () => {
                delete (window as any).triggerAutoScroll
            }
        }
    }, [trigger])

    return <>{children}</>
}

// Alternative version that works with Lenis instance directly
export function AutoScrollWrapperWithLenis({
    children,
    delay = 1,
    duration = 2,
    ease = 'power2.out',
    trigger = 'pageLoad',
    onScrollComplete,
}: AutoScrollWrapperProps) {
    const hasScrolled = useRef(false)

    const executeScrollWithLenis = () => {
        if (hasScrolled.current) return
        hasScrolled.current = true

        // Try to get Lenis instance from window (you might need to expose it)
        const lenis = (window as any).lenis

        if (lenis) {
            const currentScroll = lenis.scroll
            const targetScroll = currentScroll + window.innerHeight

            gsap.to(lenis, {
                scroll: targetScroll,
                duration: duration,
                ease: ease,
                onUpdate: () => {
                    lenis.scrollTo(gsap.getProperty(lenis, 'scroll'))
                },
                onComplete: () => {
                    onScrollComplete?.()
                }
            })
        } else {
            // Fallback to regular window scroll
            const currentScroll = window.scrollY || document.documentElement.scrollTop
            const targetScroll = currentScroll + window.innerHeight

            gsap.to(window, {
                scrollTo: targetScroll,
                duration: duration,
                ease: ease,
                onComplete: () => {
                    onScrollComplete?.()
                }
            })
        }
    }

    useEffect(() => {
        if (trigger === 'immediate') {
            setTimeout(executeScrollWithLenis, delay * 1000)
        } else if (trigger === 'pageLoad') {
            const timer = setTimeout(() => {
                executeScrollWithLenis()
            }, delay * 1000)

            return () => clearTimeout(timer)
        }
    }, [delay, duration, ease, trigger, onScrollComplete])

    useEffect(() => {
        if (trigger === 'custom') {
            ; (window as any).triggerAutoScroll = executeScrollWithLenis

            return () => {
                delete (window as any).triggerAutoScroll
            }
        }
    }, [trigger])

    return <>{children}</>
}