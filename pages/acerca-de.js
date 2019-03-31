import React, { Fragment } from 'react';
import Head from 'next/head';
import { Typography } from '@smooth-ui/core-sc';

import { Content, Footer, NavigationHeader, PageWrapper, NavigationOffset } from './components';

const AcercaDe = () => (
  <Fragment>
    <Head>
      <title>Salón bugambilias - Acerca de</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Content>
      <NavigationHeader />
      <NavigationOffset />
      <PageWrapper>
        <section>
          <Typography variant="h2" color="primary">
            Acerca de
          </Typography>
        </section>
      </PageWrapper>
    </Content>
    <Footer />
  </Fragment>
);

export default AcercaDe;
