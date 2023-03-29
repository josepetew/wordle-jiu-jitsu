import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { api } from '@/api'

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
      <Component {...pageProps} />
    </SWRConfig>
  )
}
