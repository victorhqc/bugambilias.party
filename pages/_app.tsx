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

// class MyApp extends App {
//   public userAgent: UserAgentSingleton;

//   async getServerSideProps({ Component, ctx }) {
//     let pageProps = {};
//     let userAgentHeader = {};

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     if (ctx.req) {
//       const parser = require('ua-parser-js');
//       userAgentHeader = parser(ctx.req.headers['user-agent']);
//     }

//     return { pageProps, userAgentHeader };
//   }

//   constructor(props) {
//     super(props);
//     this.userAgent = new UserAgentSingleton(props.userAgentHeader);
//   }

//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       <>
//         {/* <NextSeo config={SEO} /> */}
//         <Head>
//           <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//         </Head>
//         {/* <Normalize /> */}
//         <GlobalStyle />
//         <UserAgent.Provider value={this.userAgent}>
//           {/* <ThemeProvider theme={theme}> */}
//           <Component {...pageProps} />
//           {/* </ThemeProvider> */}
//         </UserAgent.Provider>
//       </>
//     );
//   }
// }
