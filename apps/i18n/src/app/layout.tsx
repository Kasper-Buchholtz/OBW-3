import WaitingPage from '@/components/WaitingPage'
import '@/styles/global.css'
import '@/styles/lenis.css'

export default async function RootLayout({
  children,
}) {
  return (
    <html>
      <body className='selection:bg-lights-0 selection:text-darks-900 bg-darks-900'>
        {process.env.NODE_ENV === 'production' ? <WaitingPage /> : children}
      </body>
    </html>
  )
}