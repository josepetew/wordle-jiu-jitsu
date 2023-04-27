import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { api } from '@/api'
import { Sedgwick_Ave_Display, Catamaran } from 'next/font/google'

const sedgwickAveDisplay = Sedgwick_Ave_Display({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
})

const catamaran = Catamaran({
  weight: ['500'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (url) =>
          api
            .get(url)
            .then((res) => {
              return res.data
            })
            .catch((err) => {
              return Promise.reject({
                status: err?.response?.status,
                message: err.message,
                payload: err?.response?.data?.errors,
              })
            }),
      }}
    >
      <style jsx global>{`
        :root {
          --sedgwick-ave-display-font: ${sedgwickAveDisplay.style.fontFamily};
          --catamaran-font: ${catamaran.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
