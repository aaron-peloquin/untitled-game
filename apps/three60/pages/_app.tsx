import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Canvas } from '@react-three/fiber'

function CustomApp({ Component, pageProps }: AppProps) {
  return <>
      <Head>
        <title>Welcome to three60!</title>
      </Head>
    <main className="app">
    <Canvas>
      <Component {...pageProps} />
    </Canvas>
    </main>
  </>;
}

export default CustomApp;
