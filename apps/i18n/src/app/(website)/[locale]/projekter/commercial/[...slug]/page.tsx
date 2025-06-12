import 'swiper/css';
import React from 'react';
import { loadPage } from '@/sanity/queries/loadPage';
import PageContainer from '@/components/PageContainer';
import { notFound } from 'next/navigation';
import { commercial_PROJECT_QUERY } from '@/sanity/lib/sanity.queries';
import { generatePageMetadata } from '@/utils/metadataUtils';
import ProjectTitle from '@/components/sections/ProjectTitle';
import { PageBuilder } from '@/components/PageBuilder';
import CommercialCredit from '@/components/sections/CommercialCredit';

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
    const page = await loadPage(slug, locale, commercial_PROJECT_QUERY) as unknown as any;

    if (!page) {
        notFound();
    }

    return (
        <PageContainer locale={page.localeInfo}>
            <ProjectTitle data={page} />
            <CommercialCredit data={page.FictionalObject} />
            {page.pageBuilder &&
                <PageBuilder
                    documentId={page._id}
                    documentType={page._type}
                    sections={page.pageBuilder}
                />
            }
        </PageContainer>
    );
}



export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string[] }> }) {
    const { slug: slugArray, locale: locale } = await params
    const slug = slugArray.join('/');
    const page = await loadPage(slug, locale, commercial_PROJECT_QUERY);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    return generatePageMetadata({ locale }, page, baseUrl);
}
