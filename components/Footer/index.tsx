import React, { FC } from 'react';
import { EMAIL } from '@utils/constants';
import styles from './styles.module.css';

const FooterComponent = () => {
  return (
    <div className={styles.footer}>
      <address className={styles.address}>
        Senda de los recuerdos 119, Milenio III, Querétaro, Qro 776060
      </address>
      <p className={styles.p}>
        <b>Teléfono: </b>
        <a className={styles.footer__link} href="tel:+524423138637">
          442 313 8637
        </a>
      </p>
      <p className={styles.p}>
        <b>Correo electrónico: </b>
        <a
          className={styles.footer__link}
          href={`mailto:${EMAIL}?subject=Pregunta sobre Salón Bugambilias`}
        >
          {EMAIL}
        </a>
      </p>
    </div>
  );
};

// const Footer = styled.footer`
//   background-color: ${({ theme }) => theme.secondary};
//   flex-shrink: 0;
// `;

// const Link = styled.a`
//   color: inherit;
// `;

// const Address = styled.address``;

export default FooterComponent;
