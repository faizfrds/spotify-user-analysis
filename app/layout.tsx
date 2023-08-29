import Footer from '@/components/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

const inter = Figtree({ weight: ["300", "400", "500", "600", "700", "800"], subsets: ["latin"]})

export const metadata: Metadata = {
  title: 'Recommendify',
  description: 'Spotify song tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-neutral-900 h-[100%]'>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
