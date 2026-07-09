import type { AppProps } from 'next/app'
import { Inter, WindSong } from 'next/font/google'
import '../styles/globals.css'

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const brandFont = WindSong({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-brand',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${bodyFont.variable} ${brandFont.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}
