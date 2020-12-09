import '../styles/globals.scss'
import { ReactQueryDevtools } from 'react-query-devtools'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </>
  )
}

export default MyApp
