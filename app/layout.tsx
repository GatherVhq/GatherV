import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GatherV — You are not alone',
  description: 'Type one true thing about yourself. See how many people on earth share it.',
  openGraph: {
    title: 'GatherV — You are not alone',
    description: 'Type one true thing about yourself. See how many people on earth share it.',
    url: 'https://gatherv.com',
    siteName: 'GatherV',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
