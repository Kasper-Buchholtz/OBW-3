import 'swiper/css';
import React from 'react';
import { loadPage } from '@/sanity/queries/loadPage';
import PageContainer from '@/components/PageContainer';
import { notFound } from 'next/navigation';
import Section from '@/components/sections/Section';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import { formatDate } from '@/utils/date';
import { ARTICLE_QUERY } from '@/sanity/lib/sanity.queries';
import TextContainer from '@/components/sections/textContainer';
import { generatePageMetadata } from '@/utils/metadataUtils';

export interface Params {
  slug: string[];
  locale: string;
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>
}) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/');
  const page = await loadPage(slug, locale, ARTICLE_QUERY);

  if (!page) {
    notFound();
  }

  return (
    <PageContainer locale={page.localeInfo}>
      <Section
        variant="lilla"
        paddingTop="none"
        paddingX="none"
        paddingBottom="none"
        className="h-screen/1.6"
      >
        <Section
          paddingBottom="none"
          className="order-2 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-1 md:my-auto"
          tag={'div'}
        >
          <div className="col-span-full">
            <Heading spacing="small">{page.title}</Heading>
            <Heading type="p" tag="p" spacing="default">
              {page.date ? formatDate(page.date) : ''}
            </Heading>
            <Paragraph>{page.description}</Paragraph>
          </div>
        </Section>
        <div className="order-1 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-2">
          <img
            src={page.image.asset.url}
            className="h-full object-cover max-h-screen/1.6 w-full"
          />
        </div>
      </Section>
      <TextContainer variant="default">
        <Paragraph portableText>{page.body}</Paragraph>
      </TextContainer>
    </PageContainer>
  );
}



export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string[] }> }) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/');
  const page = await loadPage(slug, locale, ARTICLE_QUERY);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return generatePageMetadata({ locale }, page, baseUrl);
}
