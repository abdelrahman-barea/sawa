import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sawa - سوا',
  description: 'Your Study Companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}