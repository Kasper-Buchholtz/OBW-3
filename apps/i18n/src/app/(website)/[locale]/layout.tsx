import '@/styles/global.css'
import '@/styles/lenis.css'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import { GoogleTagManager, sendGTMEvent } from '@next/third-parties/google'
import { SanityLive } from '@/sanity/lib/sanity.live'
import { PageParams } from './[...slug]/page'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/sanity.queries'
import Script from 'next/script'
import Appconfig from 'config'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { VideoTimeProvider } from '@/components/sections/VideoTimeContext'
import PageLoader from '@/components/molecules/PageLoader'
import { PostHogProvider } from '@/components/providers'
import posthog from 'posthog-js'

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const serif = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: '400',
  preload: true,
})

export default async function RootLayout({
  params,
  children,
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  const locale = (await params).locale || Appconfig.i18n.defaultLocaleId

  const settings = await client.fetch(SITE_SETTINGS_QUERY, { locale })

  return (
    <html lang={locale} className={` ${sans.variable} ${serif.variable}`}>
      <GoogleTagManager gtmId={settings?.googleTagManager?.id} />
      <body className="selection:bg-lights-0 selection:text-darks-900">
        <Script
          id="show-banner"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: settings?.headScripts,
          }}
        />

        <PostHogProvider>
          <VideoTimeProvider>{children}</VideoTimeProvider>
        </PostHogProvider>
        <PageLoader />
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <SanityLive />
          </>
        )}
      </body>
    </html>
  )
}
