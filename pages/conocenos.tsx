import React, { useMemo } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import UAParser from 'ua-parser-js';
import { UserAgent } from '../components';
import { UserAgentSingleton, isMobileDevice } from '../utils';
import { NextSeo } from 'next-seo';

import {
  Content,
  Footer,
  NavigationHeader,
  PageWrapper,
  NavigationOffset,
  Services,
  ImageGallery,
  loadGalleryImages,
} from '../components';
import styles from './conocenos.module.css';

const Servicios: NextPage<Props> = ({ deviceType }) => {
  const userAgent = useMemo(() => new UserAgentSingleton(deviceType), []);

  const height = isMobileDevice(deviceType) ? '300px' : '600px';
  const imagesType = isMobileDevice(deviceType) ? 'mobile' : 'desktop';
  const weddingImages = useMemo(() => loadGalleryImages('wedding', imagesType), []);
  const premisesImages = useMemo(() => loadGalleryImages('premises', imagesType), []);

  return (
    <UserAgent.Provider value={{ result: userAgent }}>
      <NextSeo
        title={'Salón bugambilias, conócenos!'}
        description={`Paquetes todo incluido:
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
`}
      />
      <Head>
        <title>Salón bugambilias - Acerca de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content>
        <NavigationHeader />
        <NavigationOffset />
        <PageWrapper>
          <section>
            <h2 className={styles.title}>
              Te ofrecemos nuestros servicios de paquetes
              <br />
              <small>Todo incluido para realizar tu evento.</small>
            </h2>
            <div className={styles.services}>
              <Services />
            </div>
          </section>
          <section>
            <h2 className={styles.subtitle}>Instalaciones</h2>
            <p className={styles['main-text']}>
              Nuestro salón de <b>854 metros cuadrados</b> tiene un cupo máximo para{' '}
              <b>200 personas.</b> Contamos con servicio de meseros profesionales y sistema para DJ.
            </p>
            <div className={styles.gallery__wrapper}>
              <ImageGallery images={premisesImages} height={height} nextDelay={2000} />
            </div>
          </section>
          <section>
            <h2 className={styles.subtitle}>Bodas</h2>
            <p className={styles['main-text']}>
              Ten tu boda de ensueño y sin preocupaciones. Decoramos el salón con los colores de tu
              preferencia, así como arreglos florales y decorativos.
            </p>
            <div className={styles.gallery__wrapper}>
              <ImageGallery images={weddingImages} height={height} nextDelay={1000} />
            </div>
          </section>
        </PageWrapper>
      </Content>
      <Footer />
    </UserAgent.Provider>
  );
};

export default Servicios;

type Props = { deviceType: string };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userAgentHeader = UAParser(ctx.req.headers['user-agent']);

  return { props: { deviceType: userAgentHeader.device.type ?? 'unknown' } };
};
