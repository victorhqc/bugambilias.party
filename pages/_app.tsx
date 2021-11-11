import React from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { pageview } from '../utils';

import { config } from '../next-seo.config';
import '@styles/globals.css';

Router.events.on('routeChangeComplete', (url) => pageview(url));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo openGraph={config.openGraph} />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
