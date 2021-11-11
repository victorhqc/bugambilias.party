import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { NavigationHeader, Content, PageWrapper, NavigationOffset, Footer } from '../components';

class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  renderError() {
    const { statusCode } = this.props;

    switch (statusCode) {
      case 404:
        return <Error404 />;
      default:
        return <GenericError />;
    }
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Fragment>
        <Head>
          <title>
            {statusCode}
            {' - '}Salón bugambilias
          </title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Content>
          <NavigationHeader />
          <NavigationOffset />
          <PageWrapper>
            <div className="text-center mt-24">{this.renderError()}</div>
          </PageWrapper>
        </Content>
        <Footer />
      </Fragment>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.string,
};

const Error404 = () => (
  <Fragment>
    <h1>404</h1>
    <h2>Página no encontrada.</h2>
  </Fragment>
);

const GenericError = () => (
  <Fragment>
    <h1>Algo anda mal en el sitio.</h1>
    <h2>Intenta cargar la página nuevamente.</h2>
  </Fragment>
);

export default Error;
