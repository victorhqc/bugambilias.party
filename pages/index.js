import React, { Fragment } from 'react';
// import { NextSeo, LocalBusinessJsonLd } from 'next-seo';

import { Content, Footer, NavigationHeader, ImageFade, PageWrapper } from '../components';
import styles from './index.module.css';

const PREMISES_PICTURE = '/premises/mobile/premises_1.jpg';
const WEDDING_INDEX_PICTURE = '/wedding/mobile/wedding_1.jpg';
const WEDDING_PICTURE = '/wedding/mobile/wedding_4.jpg';
const PREMISES_ALT = 'Mesas arregladas con mantelería y platos, listas para comenzar la fiesta.';
const WEDDING_INDEX_PICTURE_ALT = 'Contamos con servicio de bodas';
const SEO_TITLE = 'Salón bugambilias, Fiestas y Eventos Sociales en Querétaro';
const SEO_DESCRIPTION = `
Contamos con servicio de Parrilla, Sala lounge, barra de alimentos, luz y sonido, manteleria,
servicio de cocina, inflables, juegos infantiles y todo para tu fiesta.
`;

const Index = () => (
  <>
    {/* <NextSeo
      config={{
        title: SEO_TITLE,
        description: SEO_DESCRIPTION,
        openGraph: {
          url: 'https://bugambilias.party/',
          title: SEO_TITLE,
          description: SEO_DESCRIPTION,
          images: [
            {
              url: PREMISES_PICTURE,
              width: 650,
              height: 432,
              alt: PREMISES_ALT,
            },
            {
              url: WEDDING_INDEX_PICTURE,
              width: 650,
              height: 432,
              alt: WEDDING_INDEX_PICTURE_ALT,
            },
          ],
        },
      }}
    /> */}
    {/* <LocalBusinessJsonLd
      type="EventVenue"
      id="https://bugambilias.party"
      name="Salón bugambilias"
      description={SEO_TITLE}
      url="https://bugambilias.party"
      telephone="+524423138637"
      address={{
        streetAddress: 'Senda de los recuerdos 119',
        addressLocality: 'Santiago de Querétaro',
        addressRegion: 'Qro',
        postalCode: '776060',
        addressCountry: 'MX',
      }}
      geo={{
        latitude: '20.597256',
        longitude: '-100.343215',
      }}
      images={[PREMISES_PICTURE, WEDDING_INDEX_PICTURE, WEDDING_PICTURE]}
    /> */}
    <Content>
      <NavigationHeader color="#fff" />
      <ImageFade />
      <PageWrapper>
        <section>
          <h1>Salón bugambilias</h1>
          <p>
            En Salón de eventos Bugambilias, te ofrecemos servicios para realizar todo tipo de
            eventos como:
          </p>
          <ul>
            <li>
              <b>Bodas</b>
            </li>
            <li>
              <b>XV Años</b>
            </li>
            <li>
              <b>Bautizos</b>
            </li>
            <li>
              <b>Primeras comuniones</b>
            </li>
            <li>
              <b>Eventos empresariales</b>
            </li>
          </ul>
          <p>
            Con la mejor calidad de servicio y atención personalizada en todo momento por parte de
            nuestro personal altamente capacitado para que tu evento sea de tu total satisfacción.
          </p>
          <h4>
            Tu experiencia en Salón Bugambilias será inolvidable, dentro de un ambiente maravilloso
            y único.
          </h4>
          <div className={styles.flex__wrapper}>
            <div className={styles.content}>
              <img
                className={styles.img}
                style={{ backgroundImage: PREMISES_PICTURE }}
                alt={PREMISES_ALT}
              />
            </div>
            <div className={styles.content}>
              <img
                className={styles.img}
                style={{ backgroundImage: WEDDING_INDEX_PICTURE }}
                alt={WEDDING_INDEX_PICTURE_ALT}
              />
            </div>
          </div>
        </section>
      </PageWrapper>
    </Content>
    <Footer />
  </>
);

export default Index;
