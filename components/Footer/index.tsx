import React, { FC } from 'react';
import style from './styles.module.css';

const FooterComponent = () => {
  return (
    <div className={style.footer}>
      <address>Senda de los recuerdos 119, Milenio III, Querétaro, Qro 776060</address>
      <p>
        <b>Teléfono: </b>
        <a className={style.footer__link} href="tel:+524423138637">
          442 313 8637
        </a>
      </p>
      <p>
        <b>Correo electrónico: </b>
        <a
          className={style.footer__link}
          href="mailto:israel_bugam@hotmail.com?subject=Pregunta sobre Salón Bugambilias"
        >
          israel_bugam@hotmail.com
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
