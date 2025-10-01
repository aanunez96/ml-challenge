import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ML Challenge Store',
  description: 'Product detail pages challenge for MercadoLibre',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-ml-bg-sub text-ml-text`}
      >
        <Header />
        <main className="min-h-screen bg-ml-bg-sub">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
