import { GameDataProvider } from '@datastore';
import {AppProps} from 'next/app';
import Head from 'next/head';

import './styles.css';

const UntitledGameApp = ({Component, pageProps}: AppProps) => {
  return (
    <GameDataProvider>
      <Head>
        <title>Untitled Game!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </GameDataProvider>
  );
};

export default UntitledGameApp;
