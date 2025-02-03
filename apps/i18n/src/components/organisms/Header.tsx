'use client'
import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import * as React from 'react'
import { useEffect } from 'react'
import Navigation from '@/components/organisms/Navigation'
import Logo from '../atoms/Logo'
import { FooterType } from '@/types/Footer.types'
import Section from '../sections/Section'
import { resolveHomeHrefLang } from '@repo/i18n/src/resolveHrefLang'
import NavigationGroup from './NavigationGroup'

/**
 *
 * @returns: En header, der indeholder logo og søgefunktion.
 * @example: <Header />
 * @alias: Header
 * @summary: Denne komponent bruges til at vise en header med logo og søgefunktion.
 * @version: 2.0.0
 * @property: []
 * @todo: Implementer bedre a11y.
 * @author: Kasper Buchholtz
 *
 **/


export default function Header({ locale }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Section
        variant='none'
        paddingBottom={'none'} paddingTop={'none'} tag={'header'}
        className={` fixed top-0 right-0 w-full py-4 se-grid  z-[9999999999] h-20 transition-all`}
      >
        <Link className='col-span-2 col-start-1 md:col-span-5 xl:col-span-6' href={resolveHomeHrefLang(locale.locale)} title={locale.title}>
          <Logo className="w-full h-auto max-w-xs" variant='mørk' />
        </Link>
        <NavigationGroup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          locale={locale}
        />
      </Section>
      <Navigation locale={locale} isOpen={isOpen} handleClick={handleClick} />
    </>
  )
} 