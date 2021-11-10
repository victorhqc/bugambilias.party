import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import { NextSeo } from 'next-seo';

import {
  Content,
  Footer,
  NavigationHeader,
  PageWrapper,
  NavigationOffset,
  Services,
  ImageGallery,
  withUserAgent,
  loadGalleryImages,
} from '../components';
import styles from './conocenos.module.css';

// const supportTextMargin = { xs: '50px 0 0 0' };

const Servicios = ({ isMobileDevice }) => {
  const height = isMobileDevice ? '300px' : '600px';
  const imagesType = isMobileDevice ? 'mobile' : 'desktop';
  const weddingImages = useMemo(() => loadGalleryImages('wedding', imagesType), []);
  const premisesImages = useMemo(() => loadGalleryImages('premises', imagesType), []);

  return (
    <Fragment>
      {/* <NextSeo
        config={{
          title: 'Salón bugambilias, conócenos!',
          description: `
Paquetes todo incluido:
- Fiesta infantil
- XV años
- Inflables
- Mantelería
- Luz y Sonido Dj
- Servicio de cocina
- Fiestas familiares
- Taquizas (tacos al pastor)
- Sala Lounge
- Rocolas
`,
        }}
      /> */}
      <Head>
        <title>Salón bugambilias - Acerca de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content>
        <NavigationHeader />
        <NavigationOffset />
        <PageWrapper>
          <section>
            <h2>
              Te ofrecemos nuestros servicios de paquetes
              <br />
              <small>Todo incluido para realizar tu evento.</small>
            </h2>
            <div className={styles.styles}>
              <Services />
            </div>
          </section>
          <section>
            <h2>Instalaciones</h2>
            <p>
              Nuestro salón de <b>854 metros cuadrados</b> tiene un cupo máximo para{' '}
              <b>200 personas.</b> Contamos con servicio de meseros profesionales y sistema para DJ.
            </p>
            <Box mt={{ xs: 15, md: 30 }}>
              <ImageGallery images={premisesImages} height={height} nextDelay={2000} />
            </Box>
          </section>
          <section>
            <h2>Bodas</h2>
            <p>
              Ten tu boda de ensueño y sin preocupaciones. Decoramos el salón con los colores de tu
              preferencia, así como arreglos florales y decorativos.
            </p>
            <Box mt={{ xs: 15, md: 30 }}>
              <ImageGallery images={weddingImages} height={height} nextDelay={1000} />
            </Box>
          </section>
        </PageWrapper>
      </Content>
      <Footer />
    </Fragment>
  );
};

Servicios.propTypes = {
  isMobileDevice: PropTypes.bool,
};

export default withUserAgent(Servicios);
