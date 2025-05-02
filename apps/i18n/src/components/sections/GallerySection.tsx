import Image from 'next/image'
import React from 'react'
import Carousel from '../organisms/Carousel'
import Section from './Section'
import { clean } from '@/utils/sanitize'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En sektion med galleri.
 * @example: <GallerySection />
 * @alias: GallerySection
 * @summary: Denne komponent bruges til at oprette en ny sektion med galleri.
: src/components/sections/GallerySection.tsx
 * @version: 1.0.0
 * @property: [section]
 * @author: Kasper Buchholtz
 *
 **/

const GallerySection = ({ section }) => {
  return (
    <Section className='grid-rows-[repeat(12, minmax(0, 320px)] h-screen '
      data={section}
    >
      <div className='relative col-span-full'>
        <Photo image={section.images[0]} className="absolute aspect-[16/9] max-w-3xl h-fit top-0 left-0" />
        <Photo image={section.images[1]} className="absolute aspect-[16/9] right-0 bottom-0 max-w-3xl h-fit" />
        <Photo image={section.images[2]} className="absolute aspect-[16/9] left-0 -bottom-1/3 max-w-3xl h-fit" />
      </div>
    </Section>
  )
}

export default GallerySection
