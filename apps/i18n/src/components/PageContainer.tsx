'use client'
import Header from '@/components/organisms/Header'
import { Lenis } from '@/components/Lenis'
import Cursor from './interactions/Cursor'
/**
 *
 * @returns: En container, der indeholder header, footer og børnekomponenter.
 * @example: <PageContainer />
 * @alias: PageContainer
 * @summary: Denne komponent bruges til at vise en container, der indeholder header, footer og børnekomponenter.
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/


export default function PageContainer({
  locale,
  lenis = {
    lerp: 0.1,
    duration: 1.2,
    smoothTouch: false, //smooth scroll for touch devices
    smooth: true,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    touchMultiplier: 2,
  },
  children,
}: {
  locale: {},
  lenis?: {
    lerp?: number,
    duration?: number,
    smoothTouch?: boolean,
    smooth?: boolean,
    easing?: (t: number) => number,
    orientation?: string,
    gestureOrientation?: string,
    smoothWheel?: boolean,
    touchMultiplier?: number,
  },
  children: React.ReactNode,
}) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-lights-0">
        {children}
      </main>
      <Cursor />
    </>
  )
}
