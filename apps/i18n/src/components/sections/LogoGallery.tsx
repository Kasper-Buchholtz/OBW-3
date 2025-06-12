import React from 'react'
import Image from 'next/image'
import Section from './Section'
import Heading from '@/components/atoms/Heading'
import { clean } from '@/utils/sanitize'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En sektion med en logo galleri.
 * @example: <LogoGallery />
 * @alias: LogoGallery
 * @summary: Denne komponent bruges til at vise et galleri med logoer
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

const LogoGallery = ({ data }) => {
  return (
    <Section data={data} className='h-screen'>
      <div className='col-span-full my-auto'>
        <div className="col-span-full">
          <Heading size="h2" className="mb-4">
            {data.title}
          </Heading>
        </div>
        <ul className="grid grid-cols-1 gap-6 col-span-full sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 md:flex-row">
          {data.images.map((image, index) => (
            <li className='aspect-w-16 aspect-h-9' key={index}>
              <Photo image={image} className='object-contain' />
            </li>
          ))}
        </ul>
      </div>

    </Section>
  )
}

export default LogoGallery
