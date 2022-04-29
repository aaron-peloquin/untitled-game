import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { VRCanvas, DefaultXRControllers  } from '@react-three/xr'

function CustomApp({ Component, pageProps }: AppProps) {
  return <>
      <Head>
        <title>Welcome to three60!</title>
      </Head>
    <main className="app">
      <VRCanvas>
        <DefaultXRControllers />
        <Component {...pageProps} />
      </VRCanvas>
    </main>
  </>;
}

export default CustomApp;
