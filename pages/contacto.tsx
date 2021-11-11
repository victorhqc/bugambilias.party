import React, { useCallback, useMemo } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import UAParser from 'ua-parser-js';
import { NextSeo } from 'next-seo';
import {
  Content,
  Footer,
  NavigationHeader,
  PageWrapper,
  NavigationOffset,
  GoogleMaps,
  withUserAgent,
  UserAgent,
} from '../components';
import { event, UserAgentSingleton } from '../utils';
import styles from './contacto.module.css';

const Contacto: NextPage<Props> = ({ deviceType }) => {
  const userAgent = useMemo(() => new UserAgentSingleton(deviceType), []);

  const onWhatsapp = useCallback(() => {
    event({
      action: 'contact_type',
      category: 'Contact',
      label: 'Whatsapp',
    });
  }, []);
  const onEmail = useCallback(() => {
    event({
      action: 'contact_type',
      category: 'Contact',
      label: 'Email',
    });
  }, []);

  return (
    <UserAgent.Provider value={{ result: userAgent }}>
      <NextSeo
        title="Salón bugambilias, contáctanos"
        description={`
Llámanos de lunes a viernes por teléfono o whatsapp al 442 313 8637 o por correo electrónico
israel_bugam@hotmail.com.

Estamos ubicados en Senda de los recuerdos 119, Milenio III, Querétaro, Qro 776060
`}
      />
      <Head>
        <title>Salón bugambilias - Contáctanos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Content>
        <NavigationHeader />
        <NavigationOffset />
        <PageWrapper>
          <h2 className={styles.title}>Contáctanos</h2>
          <p className={styles.text}>
            Llámanos de lunes a viernes de <i>9:00am a 7:00pm</i> o envíanos un mensaje en Whatsapp
            o correo electrónico.
          </p>
          <div className={styles.content}>
            <div className={styles.link__wrapper}>
              <img
                className={styles.img}
                src="/icons/whatsapp_logo.svg"
                alt="Whatsapp Logo"
                width={60}
              />
              <a className={styles.link} href="https://wa.me/5214423138637" onClick={onWhatsapp}>
                442 313 8637
              </a>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.link__wrapper}>
              <img
                className={styles.img}
                src="/icons/email.svg"
                alt="Correo electrónico"
                width={60}
              />
              <a
                className={styles.link}
                href="mailto:israel_bugam@hotmail.com?subject=Pregunta sobre Salón Bugambilias"
                onClick={onEmail}
              >
                israel_bugam@hotmail.com
              </a>
            </div>
          </div>
          <GoogleMaps />
        </PageWrapper>
      </Content>
      <Footer />
    </UserAgent.Provider>
  );
};

export default Contacto;

type Props = { deviceType: string };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userAgentHeader = UAParser(ctx.req.headers['user-agent']);

  return { props: { deviceType: userAgentHeader.device.type ?? 'unknown' } };
};
