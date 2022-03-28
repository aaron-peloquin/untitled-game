import {AppProps} from 'next/app';
import Head from 'next/head';
import './styles.css';

const CustomApp = ({Component, pageProps}: AppProps) => {
  return (
    <div>
      <Head>
        <title>Untitled Game!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default CustomApp;
