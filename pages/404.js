import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import { NextSeo } from 'next-seo';

import {
  Content,
  Footer,
  NavigationHeader,
  PageWrapper,
  NavigationOffset,
  withUserAgent,
} from '../components';

const Four0Four = ({ isMobileDevice }) => {
  return (
    <Fragment>
      {/* <NextSeo
        config={{
          title: 'Salón bugambilias - 404',
          description: 'Página no encontrada.',
        }}
      /> */}
      <Head>
        <title>Salón bugambilias - 404</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content>
        <NavigationHeader />
        <NavigationOffset />
        <PageWrapper>
          <h2>404</h2>
          <p>Página no encontrada.</p>
        </PageWrapper>
      </Content>
      <Footer />
    </Fragment>
  );
};

Four0Four.propTypes = {
  isMobileDevice: PropTypes.bool,
};

export default withUserAgent(Four0Four);
