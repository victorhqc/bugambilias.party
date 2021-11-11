import React, { useMemo } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import UAParser from 'ua-parser-js';
import { UserAgent } from '../components';
import { UserAgentSingleton } from '../utils';

import { Content, Footer, PageWrapper } from '../components';

const Four0Four: NextPage = () => {
  const userAgent = useMemo(() => new UserAgentSingleton('unknown'), []);

  return (
    <UserAgent.Provider value={{ result: userAgent }}>
      <NextSeo title="Salón bugambilias - 404" description="Página no encontrada." />
      <Head>
        <title>Salón bugambilias - 404</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content>
        {/* <NavigationHeader />
        <NavigationOffset /> */}
        <PageWrapper>
          <h2>404</h2>
          <p>Página no encontrada.</p>
        </PageWrapper>
      </Content>
      <Footer />
    </UserAgent.Provider>
  );
};

export default Four0Four;
