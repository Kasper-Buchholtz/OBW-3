"use client"
import React from 'react'
import ArticlesSection from '@/components/sections/ArticlesSection'
import CallToActionSection from '@/components/sections/CallToActionSection'
import CallToActionSection2 from './sections/CallToActionSection2'
import EventSection from '@/components/sections/EventSection'
import GallerySection from '@/components/sections/GallerySection'
import Hero from '@/components/sections/HeroSection'
import Media from '@/components/sections/MediaSection'
import TextWithIllustration from '@/components/sections/TextWithIllustration'
import EmployeesSection from './sections/EmployeesSection'
import Breadcrumbs from './molecules/Breadcrumbs'
import TextContainer from './sections/textContainer'
import Hero2 from './sections/Hero2Section'
import Hero3 from './sections/Hero3Section'
import LogoGallery from './sections/LogoGallery'
import LogoGallery2 from './sections/LogoGallery2'
import ContactFormSection from './sections/ContactFormSection'
import { createDataAttribute, useOptimistic } from '@sanity/visual-editing'
import { PageBuilderProps, PageData, Section } from '@/types/PageBuilder.types'
import ProjectsTypeSection from './sections/projectsTypeSection'
import WatchSection from './sections/WatchSection'

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
};

export function PageBuilder({
  sections: initialSections,
  documentId,
  documentType,
}: PageBuilderProps) {
  const sections = useOptimistic<Section[], PageData>(
    initialSections,
    (currentSections, action) => {
      if (action.id !== documentId) {
        return currentSections;
      }

      if (action.document.sections) {
        return action.document.sections;
      }

      return currentSections;
    }
  );
  function randomKey() {
    return Math.random().toString(36).substring(7)
  }
  return (
    <div
      data-sanity={createDataAttribute({
        ...sanityConfig,
        id: documentId,
        type: documentType,
        path: 'pageBuilder',
      }).toString()}
    >
      {sections.map((section) => (
        <div className=''
          key={section._key || randomKey()}
          data-sanity={createDataAttribute({
            ...sanityConfig,
            id: documentId,
            type: documentType,
            path: `pageBuilder[_key=="${section._key}"]`,
          }).toString()}
        >
          {renderSection(section)}
        </div>
      ))}
    </div>
  )
}

function renderSection(section: Section) {
  switch (section?._type) {
    case 'EmployeesType':
      return <EmployeesSection section={section} />
    case 'CallToAction':
      return <CallToActionSection section={section} />
    case 'CallToAction2':
      return <CallToActionSection2 section={section} />
    case 'hero':
      return <Hero data={section} />
    case 'Hero2':
      return <Hero2 data={section} />
    case 'Hero3':
      return <Hero3 data={section} />
    case 'LogoGallery':
      return <LogoGallery data={section} />
    case 'LogoGallery2':
      return <LogoGallery2 data={section} />
    case 'textWithIllustration':
      return <TextWithIllustration data={section} />
    case 'contactFormType':
      return <ContactFormSection data={section} />
    case 'Gallery':
      return <GallerySection section={section} />
    case 'ArticlesType':
      return (
        <ArticlesSection
          section={section}
          amount={section.amount}
        />
      )
    case 'EventType':
      return (
        <EventSection
          amount={section.amount}
          section={section}
        />
      )
    case 'textContainer':
      return <TextContainer data={section} />
    case 'MediaType':
      return <Media data={section} index={undefined} />
    case 'projectsType':
      return <ProjectsTypeSection data={section} />
    case 'WatchType':
      return <WatchSection data={section} />
    case 'ImagesType':
      return <GallerySection section={section} />
    default:
      return null
  }
}
