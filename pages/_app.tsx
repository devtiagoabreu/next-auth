import { AppProps } from '../../node_modules/next/app';
import { Header } from '../components/Header';
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
       <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
