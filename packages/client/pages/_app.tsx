import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NestBE</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
