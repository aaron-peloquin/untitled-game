import {AppProps} from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({Component, pageProps}: AppProps) {
  return (
    <html>
      <Head>
        <title>Welcome to nextjs-ui!</title>
      </Head>
      <body>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </body>
    </html>
  );
}

export default CustomApp;
