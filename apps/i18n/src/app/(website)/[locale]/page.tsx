import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/utils/metadataUtils'
import 'swiper/css'
import AutoScrollWrapper from '@/components/GSAPScrollSection'

export default async function IndexRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = (await params).locale
  const page = await loadPage('/', locale)
  if (!page) {
    notFound();
  }

  return (
    <AutoScrollWrapper
      delay={1.5}        // Wait 1.5 seconds before scrolling
      duration={2.5}     // Take 2.5 seconds to complete the scroll
      ease="power2.out"  // Smooth easing
      trigger="pageLoad" // Start after page loads
      onScrollComplete={() => {
        console.log('Scroll animation completed!')
      }}
    >
      <PageContainer locale={page.localeInfo}>
        {page.pageBuilder &&
          <PageBuilder
            documentId={page._id}
            documentType={page._type}
            sections={page.pageBuilder}
          />
        }
      </PageContainer>
    </AutoScrollWrapper>
  );
}


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale

  const page = await loadPage('/', locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return generatePageMetadata({ locale }, page, baseUrl);
}
