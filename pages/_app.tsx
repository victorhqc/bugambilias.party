import React, { useMemo } from 'react';
import type { AppProps, AppContext } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
// import { NextSeo } from 'next-seo';
import { UserAgent } from '../components';
import { UserAgentSingleton, pageview } from '../utils';
import type { PromiseType } from '../utils/types';
// import SEO from '../next-seo.config';

import '@styles/globals.css';

Router.events.on('routeChangeComplete', (url) => pageview(url));

export async function getServerSideProps({ ctx, Component }: AppContext) {
  let pageProps = {};
  let userAgentHeader = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (ctx.req) {
    const parser = require('ua-parser-js');
    userAgentHeader = parser(ctx.req.headers['user-agent']);
  }

  return { pageProps, userAgentHeader };
}

type ServerSideProps = PromiseType<ReturnType<typeof getServerSideProps>>;

function MyApp({ Component, pageProps, userAgentHeader }: AppProps & ServerSideProps) {
  const userAgent = useMemo(() => new UserAgentSingleton(userAgentHeader), []);

  return (
    <>
      {/* <NextSeo config={SEO} /> */}
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Normalize /> */}
      <UserAgent.Provider value={{ result: userAgent }}>
        {/* <ThemeProvider theme={theme}> */}
        <Component {...pageProps} />
        {/* </ThemeProvider> */}
      </UserAgent.Provider>
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
