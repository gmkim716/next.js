import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
